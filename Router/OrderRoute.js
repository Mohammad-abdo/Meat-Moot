const express =require('express')

const router= express.Router()

const OrderController=require("../Controllers/order")


router.route("/success").post(OrderController.creatOrder)



module.exports=router