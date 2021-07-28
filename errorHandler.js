function errorHandler(res,err){
    console.log('errorHandler started')
    console.log(err)
    // let message =null
    // if (err.comesFrom){
    //     message = `error comes from ${err.comesFrom}`
    //     delete err.comesFrom
    // }
    //removing status codes so that frontend can read the response
    // if (err.statusCode){
    //     res.status(err.statusCode)
    // } else{
    //     res.status(400)
    // }
    
    res.json({status:false,error:{name:err.name,message:err.message}})
}

module.exports=errorHandler