const express=require('express')
const morgan=require('morgan')
const cors = require('cors')
const user=require('./routes/userRoutes')
const dotenv=require('dotenv').config()
const app=express()
require('./dbConnect')
app.use(express.json())
// const corsOptions={
//     origin:whitelist,
//     credentials:true
// }
app.use(cors())
app.use(morgan('dev'))
app.use('/user',user)
app.use((req,res,next)=>{
    res.status(404).json({
        error:'not found'
    })
})
app.listen(5000,()=>{
    console.log(`Server listening on 5000`)
})