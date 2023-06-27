const express=require('express')
const app=express()
app.use(express.json())
const Product=require('../models/productSchema')
const multer=require('multer')
const upload=multer({dest:"uploads/"})
const fs=require('fs')

const newProduct = async (req, res) => {
    try {
      const { prodName, brand, description, price, category, stock } = req.fields;
      const { images } = req.files;
        
      const prod = new Product(req.fields);

      if (images) {
        // if (Array.isArray(images)) {
          // If multiple images are uploaded
          for (let i = 0; i < images.length; i++) {
            const image = images[i];
            console.log(i)
            console.log(image)
            prod.images.push({
              data: fs.readFileSync(image.path),
              contentType: image.type,
            });
          }
        // } else {
        //   // If only a single image is uploaded
        //   prod.images.push({
        //     data: fs.readFileSync(images.path),
        //     contentType: images.type,
        //   });
        // }
      }
  
      await prod.save();
  
      res.json({ message: 'Success', prod }).status(200);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const products=async(req,res)=>{
    try {
        let products=await Product.find({}).sort({createdAt:-1})
        res.send({message:'All Products',totalCount:products.length,products}).status(200)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
const prodname=async(req,res)=>{
    try {
        let data=await Product.findById(req.params.id)
        if(data!=null)
        res.send(data).status(200)
        else
        res.status(300).json({message:'Product not found'})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
const prodImage = async (req, res) => {
    try {
      const prod = await Product.findById(req.params.pid).select('images');
      if (prod.images.length > 0) {
        const imagePromises = prod.images.map(async (image) => {
          if (image.data) {
            return {
              data: image.data,
              contentType: image.contentType,
            };
          }
        });
        const images = await Promise.all(imagePromises);
        res.set('Content-Type', prod.images[0].contentType)
        res.status(200).send(prod.images);
      } else {
        res.status(404).json({ message: 'No images found for the product' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
module.exports={newProduct,products,prodname,prodImage}