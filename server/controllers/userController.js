const express=require('express')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()
const app=express()
const User=require('../models/userSchema')
const nodemailer=require('nodemailer')
app.use(express.json()) 
const newUser=async(req,res)=>{
    const {username, password, email, address, mobile}=req.body;
    if(!username || !password || !email || !address || !mobile )
    return res.status(400).json({error:"Please fill the necessary details "})
    const user=new User(req.body)
    try {
        await user.save()
        res.json({message:'Success',user}).status(200)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message}) 
    }
}
const userLogin=async(req,res)=>{
    const {email,password,role}=req.body
    if(!email || !password || !role)
    return res.status(400).json({error:'Please Fill the Details'})
    try {
            const userData=await User.findOne({email:req.body.email})
            if(!userData)
            return res.status(400).json({error:'User not found'})
            const validPassword=await bcrypt.compare(req.body.password,userData.password)
            if(!userData || !validPassword || userData.role!=req.body.role)
            res.status(400).json({error:'Invalid credentials'})
            else
            {
               const token=jwt.sign({email:req.body.email},process.env.SECRET_KEY,{expiresIn:'1d'})
               userData.tokens=userData.tokens.concat({token})
               await userData.save()
                return res.status(200).json({token:token,user:userData})
            }
    } catch (error) {
        console.log(error.message)
        res.status(400).send(error.message)
    } 
}
module.exports={
    newUser,
    userLogin
}