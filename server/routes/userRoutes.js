const express=require('express')
const router=new express.Router()
const authentication=require('../middleware/auth')
const{newUser,
    userLogin,
    auth,
    verifyOtp,
    forgotPass,
    newPass}=require('../controllers/userController')
router.post('/newUser',newUser)
router.post('/userLogin',userLogin)
router.get('/auth',authentication.verifyToken,auth)
router.post('/forgotPass', forgotPass);
router.post('/verifyOtp', verifyOtp);
router.post('/newPass', newPass);
module.exports=router