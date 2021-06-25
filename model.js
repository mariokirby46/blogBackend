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
    // let urls = []
    // for (let i = 0;i<this.files.length;i++){
    //     let url = s3.getSignedUrl('getObject',{
    //         Bucket:process.env.aws_bucket,
    //         Key:this.,
    //         Expires:300
    //     })
    //     urls.push(url)
    // }
    // return urls
})

blogSchema.methods.function = function(param){

}

blogSchema.pre('save',function(next){
    //do things
    console.log('saved')
    
    next()
})

blogSchema.post('save',function(res,next){
    console.log('blog saved')
    next()
})

blogSchema.post('findOne',function(res,next){
    console.log('blog found')
    next()
})

blogSchema.post('find',function errorHandler(err,res,next){
    //error handle if needed
    next()
})



module.exports = new mongoose.model('Blogs',blogSchema)

