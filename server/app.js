const express=require('express')
const morgan=require('morgan')
const dotenv=require('dotenv').config()
const app=express()
require('./dbConnect')
app.use(express.json())
app.use(morgan('dev'))
app.use((req,res,next)=>{
    res.status(404).json({
        error:'not found'
    })
})
module.exports=app
app.listen(()=>{
    console.log(`Server listening on ${process.env.PORT}`)
})