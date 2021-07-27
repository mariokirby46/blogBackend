require('dotenv/config')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const router = require('./router')

require('./blogCounter').init()

const app = express()

mongoose.connect(process.env.db, {useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false,useCreateIndex:true})
    .catch((err)=>{throw new Error('error connecting to db ' +err)});

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/',router)



app.listen(process.env.PORT||3000, ()=>console.log('listening to port 3000'))