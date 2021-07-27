const mongoose = require('mongoose')

const s3 = require('./s3')

const blogSchema = new mongoose.Schema({
    title:String,
    point:String,
    author:String,
    position:String,
    date:String,
    postNumber:Number,
    content:{type:Array,required:true},
    files:[String]
},{
    toJSON:{virtuals:true}
})

blogSchema.methods.clearImages=async function(){
    if(this.files){
        var params = {
            Bucket: process.env.bucket, 
            Delete: { 
                Objects: []
            }
        }
        for(let i =0;i<this.files.length;i++){
            params.Delete.Objects.push({Key:this.files[i]})
        }
      
        s3.deleteObjects(params, function(err, data) {
            if (err) {
                console.log('there was an error removing image from s3')
                console.log(err, err.stack);
                // throw err
            } 
            else{
                console.log('deleted from s3 successfully')
                return
            }
        });
    }else{
        console.log('no files')
        return
    }
}

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
    if(res){
        console.log('blog found')
    } else if(!res){
        console.log('there is no blog')
    }
    next()
})

blogSchema.post('remove',function(res,next){
    console.log('blog deleted')
    if(res.files){
        res.clearImages()
        next()
    }else{
        next()
    }
})


module.exports = new mongoose.model('Blogs',blogSchema)

