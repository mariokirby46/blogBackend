const mongoose = require('mongoose')

let blogCounter=new mongoose.model('counter',{number:Number})

function init(){
    blogCounter.findOne({},function(err,res){
        if (!res){
            let counter = new blogCounter({number:1})
            console.log('no counter. Creating')
            counter.save()
        }
    })
}

async function getNumber(){
    let number
    await blogCounter.findOne({},function(err,res){
        number= res.number
    })
    return number
}

function increment(){
    blogCounter.findOne({},function(err,res){
        res.number = res.number+1
        res.save()
    })
}

module.exports.init=init
module.exports.getNumber=getNumber
module.exports.increment=increment