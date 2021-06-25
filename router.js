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

router.post('/form',upload.array('images'),function(req,res){
    console.log(req.body)
    console.log(req.files)
    
    let doc = new model({title:req.body.title,content:req.body.text,files:[req.files[0].key]})
    doc.save()
    res.json({status:true,doc:doc})
})


//404 not found
router.use( function(req,res){
    console.log(`page not found`)
    res.status(404)
    res.send('404 page not found')
})

module.exports = router