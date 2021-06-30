const express = require('express')

const upload = require('./multer')
const model = require('./model')

const  router = express.Router()


//console.logs
router.use(function(req,res,next){
    console.log(`Path: ${req.path}, Method: ${req.method}`)
    next()
})


router.get('/',function(req,res){
    res.json({hello:'world'})
})

router.post('/form',upload.array('dragger'),function(req,res){
    let input = req.body
    console.log(input)
    if (req.files){
        console.log(req.files)
        let fileKeys=[]
        for(let i = 0;i<req.files.length;i++){
            fileKeys.push(req.files[i].key)
        }
        input.files=fileKeys
    }
    
    

    let doc = new model(input)
    model.countDocuments().then(function(count){
        doc.postNumber = count +1
        console.log(`this is blog number ${doc.postNumber}`)
        doc.save()
        res.json({status:true,doc:doc})
    })
})

router.get('/search',async function(req,res){
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
})

router.delete('/search',async function(req,res){
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
})

//404 not found
router.use( function(req,res){
    console.log(`page not found`)
    res.status(404)
    res.send('404 page not found')
})

module.exports = router