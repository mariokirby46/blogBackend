const express = require('express')

const upload = require('./multer')
const model = require('./model')
const blogCounter= require('./blogCounter')
const errorHandler = require('./errorHandler')

const  router = express.Router()


//console.logs
router.use(function(req,res,next){
    console.log(`Path: ${req.path}, Method: ${req.method}`)
    next()
})


router.get('/',async function(req,res){
    res.json({hello:'world'})
})

router.post('/form',upload.array('dragger'),async function(req,res){
    try{
        let input = req.body
        console.log(input)

        //check if there is something uploaded
        if (req.files.length>0){
            console.log(req.files)
            let fileKeys=[]
            for(let i = 0;i<req.files.length;i++){
                fileKeys.push(req.files[i].key)
            }
            input.files=fileKeys
        }
        
        blogCounter.increment()
        number = await blogCounter.getNumber()
        input.postNumber=number

        console.log(input)
        let doc = new model(input)
        doc.save()
        res.json({status:true,doc:doc})
    }catch(err){
        errorHandler(res,err)
    }
})

router.get('/search',async function(req,res){
    try{
        if (!req.query['number']){
        console.log('wrong query')
        return res.status(400)
        }
        console.log(`query is ${req.query.number}`)
        let doc = await model.findOne({postNumber:req.query.number})
        console.log(doc)
        if(doc){
            res.json(doc)
        }else{
            res.json({status:false,message:'there is no doc'})
        }
    }catch(err){errorHandler(res,err)}
})

router.delete('/search',async function(req,res){
    try{
        if (!req.query['number']){
            console.log('wrong query')
            return res.status(400)
        }
        console.log(`query is ${req.query.number}`)
        let doc = await model.findOne({postNumber:req.query.number})
        if(doc){
            doc.remove()
            res.json({status:true})
        }else{
            res.json({status:false,message:'there is no doc'})
        }
    }catch(err){errorHandler(res,err)}
})

router.post('/search',upload.array('dragger'),async function(req,res){ 
    try{
        if (!req.query['number']){
            console.log('wrong query')
            return res.status(400)
        }
        console.log(`query is ${req.query.number}`)
        let doc = await model.findOne({postNumber:req.query.number})
        let input = req.body
        console.log(input)
        doc.clearImages()
    
        console.log(`files: ${req.files}`)
        let fileKeys=[]
        for(let i = 0;i<req.files.length;i++){
            fileKeys.push(req.files[i].key)
        }
        input.files=fileKeys
        
        for (i in input){
            doc[i]=input[i]
        }
        doc.save()
        res.json({status:true,doc:doc})
    }catch(err){errorHandler(res,err)}
})

router.get('/search/all', async function(req,res){
    try{
        let docs = await model.find({})
        if (docs.length==0){
            return res.json({status:true,blogs:null})
        }
        res.json({status:true,blogs:docs})
    }catch(err){errorHandler(res,err)}
})

// router.delete('/all', async function(req,res){
//     let docs = await model.find({})
//     for(let i=0;i<docs.length;i++){
//         docs[i].remove()
//     }
//     res.json({status:true,blogs:docs})
// })

//404 not found
router.use( function(req,res){
    console.log(`page not found`)
    res.status(404)
    res.send('404 page not found')
})

module.exports = router