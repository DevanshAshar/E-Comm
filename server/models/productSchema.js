const mongoose=require('mongoose')
const validator=require('validator')
const prodSchema=new mongoose.Schema({
    prodName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    images:[{
        data:Buffer,
        contentType:String
    }]
    

    ,
    shipping:{
        type:Boolean,
        default:false
    },
    stock:{
        type:Number
    },
    rating:{
        type:Number,
        default:0
    },
    numOfRev:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ]
},{timestamps:true})
const Product=mongoose.model('Product',prodSchema)
module.exports=Product