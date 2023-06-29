const express=require('express')
const morgan=require('morgan')
const cors = require('cors')
const user=require('./routes/userRoutes')
const product=require('./routes/productRoutes')
const dotenv=require('dotenv').config()
const fileUpload=require('express-fileupload')
const formidable=require('express-formidable')
const app=express()
require('./dbConnect')
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/user',user)
app.use('/product',product)
app.use((req,res,next)=>{
    res.status(404).json({
        error:'not found'
    })
})
app.listen(5000,()=>{
    console.log(`Server listening on 5000`)
})