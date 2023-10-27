const Order = require("../Models/order")
const catshAsync = require("../Utils/catshAsync");
const ApiError = require("../Utils/appError");

// const SucOrd=(res,status,order,)

exports.creatOrder= catshAsync(async (req,res,next)=>{

const {userId,id,branchId,ordDate,price}=req.body


try {

    const order= await Order.create({userId,meatId:id,branchId,ordDate,price})
res.status(200).json({
    status:"success",
    order:{
        order:order
    }
}).setHeader("location","/")
    
    
} catch (error) {
    next( new ApiError(error.mesage,500))
    
}



})