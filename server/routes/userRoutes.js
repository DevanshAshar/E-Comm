const express=require('express')
const router=new express.Router()
const authentication=require('../middleware/auth')
const{newUser,userLogin,auth}=require('../controllers/userController')
router.post('/newUser',newUser)
router.post('/userLogin',userLogin)
router.get('/auth',authentication.verifyToken,auth)
module.exports=router