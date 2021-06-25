const mongoose = require('mongoose')

const s3 = require('./s3')

const blogSchema = new mongoose.Schema({
    postNumber:{},
    content:Object,
    files:[String]
},{
    toJSON:{virtuals:true}
})



blogSchema.virtual('urls').get(function(){
    let urls = []
    for (let i = 0;i<this.files.length;i++){
        let url = s3.getSignedUrl('getObject',{
            Bucket:process.env.bucket,
            Key:this.files[i],
            Expires:300
        })
        urls.push(url)
    }
    return urls
})


blogSchema.post('save',function(res,next){
    console.log('blog saved')
    next()
})

blogSchema.post('findOne',function(res,next){
    console.log('blog found')
    next()
})

blogSchema.post('findOne',function errorHandler(err,res,next){
    //error handle if needed
    next()
})



module.exports = new mongoose.model('Blogs',blogSchema)

