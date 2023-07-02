const express=require('express')
const router=new express.Router()
const authentication=require('../middleware/auth')
const{newUser,
    userLogin,
    auth,
    verifyOtp,
    forgotPass,
    newPass,
    updateUser,
    payment}=require('../controllers/userController')
router.post('/newUser',newUser)
router.post('/userLogin',userLogin)
router.get('/auth',authentication.verifyToken,auth)
router.get('/adminAuth',authentication.admin,auth)
router.post('/forgotPass', forgotPass);
router.post('/verifyOtp', verifyOtp);
router.post('/newPass', newPass);
router.patch('/updateUser',authentication.verifyToken,updateUser)
router.post('/payment',authentication.verifyToken,payment)
module.exports=router