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
    let res = await blogCounter.findOne({})
    number = res.number
    console.log(`blogCounter number: ${number}`)
    return number
}

function increment(){
    blogCounter.findOne({},function(err,res){
        res.number = res.number+1
        res.save()
    })
}

async function getNumberAndIncrement(){
    let number
    let res = await blogCounter.findOne({})
    number = res.number
    res.number++
    await res.save()
    console.log(`blogCounter number: ${number}`)
    return number
}

module.exports.init=init
module.exports.getNumber=getNumber
module.exports.increment=increment
module.exports.getNumberAndIncrement=getNumberAndIncrement