const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/userSchema");
const Order=require("../models/ordersSchema")
const {buildPDF}=require('../utility/pdfService')
const fs=require('fs')
dotenv.config();
const app = express();
app.use(express.json())

const userOrders=async(req,res)=>{
    try {
        const orders=await Order.find({userId:userData._id}).sort({createdAt:-1})
        res.status(200).json({orders})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message:error.message})
    }
}

const invoice = async (req, res) => {
    try {
      const { amount, products, date, orderId } = req.body;
  
      const data = {
        invoiceNumber: orderId,
        products: products.map((product) => ({
          name: product.prodName,
          price: product.price,
          quantity: product.quantity
        })),
        customerName: userData.username,
        date: date,
        amount:amount
      };
  
      const onDataCallback = (chunk) => {
        res.write(chunk);
      };
  
      const onEndCallback = () => {
        res.end();
      };
  
      buildPDF(data, onDataCallback, onEndCallback);

    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
    }
  };

  const allOrders=async(req,res)=>{
    try {
        const orders=await Order.find({}).sort({createdAt:-1})
        res.status(200).json({orders})
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
  }

  const updateOrder=async(req,res)=>{
    try {
        const {orderId,status}=req.body
        const order=await Order.findByIdAndUpdate(orderId,{status:status})
        const orders=await Order.find({}).sort({createdAt:-1})
        res.status(200).json({orders})
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
  }
  

module.exports={userOrders,invoice,allOrders,updateOrder}