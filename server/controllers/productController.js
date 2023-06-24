const express=require('express')
const app=express()
app.use(express.json())
const Product=require('../models/productSchema')


const newProduct=async(req,res)=>{
    const {prodName,brand,description, price, category,stock}=req.body;
    const prod=new Product(req.body) 
    try {
        await prod.save()
        res.json({message:'Success',prod}).status(200)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}