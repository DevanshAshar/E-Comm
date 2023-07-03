const express=require('express')
const router=new express.Router()
const authentication=require('../middleware/auth')
const {userOrders, invoice, allOrders, updateOrder}=require("../controllers/orderController")
router.get('/userOrders',authentication.verifyToken,userOrders)
router.post('/invoice',authentication.verifyToken,invoice)
router.get('/allOrders',authentication.admin,allOrders)
router.patch('/updateOrder',authentication.verifyToken,updateOrder)
module.exports=router