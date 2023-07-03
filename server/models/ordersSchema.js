const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");
const ordersSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status:{
        type:String,
        enum:["In Process","Delivered"]
    },
    products:[{
        pid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        },
        price:{
            type:Number
        },
        prodName:{
            type:String
        },
        quantity:{
            type:Number,
        }
    },
    ],
    amount:{
        type:Number
    },
    date:{
        type:String
    }
},{timestamps:true})
const Order=mongoose.model('Order',ordersSchema)
module.exports=Order

