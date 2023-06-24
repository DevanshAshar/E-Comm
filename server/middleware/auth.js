const jwt = require('jsonwebtoken')
const User=require('../models/userSchema')
const authentication={

    verifyToken:async(req,res,next)=>{
    try {
        let token=req.header('Authorization')
        if(typeof(token)==="undefined")
        return res.status(401).json({error:'Unauthorized'})
        else
        {
        if(token.startsWith('Bearer ')){
        token=token.slice(7,token.length)
        }
        if(token)
        {
            try {
                const data=jwt.verify(token,process.env.SECRET_KEY)
                const user=await User.findOne({email:data.email,token:token})
                userData=user
                next()
            } catch (error) {
                return res.status(400).json({error:'Invalid Token'})
            }
        }
    }
}catch (error) {
    return res.status(401).send(error.message)
}
},

verifyUser:async(req,res,next)=>{
    try {
        const user=await User.findById(req.params.id)
        if(user.email===userData.email)
        next()
        
        else
        return res.status(401).json({error:'invalid user'})
    } catch (error) {
        res.status(404).json({error:error.message})
    }
},


admin:async(req,res,next)=>{
    try {
        if(userData.role==='admin')
        next()
        else
        return res.status(401).json({error:'not an admin'})
    } catch (error) {
       res.status(404).json({error:error.message}) 
    }
}

}

module.exports=authentication