const Order = require("../Models/BranchOrder"); // Import the Order model
const catshAsync = require("../Utils/catshAsync");
const ApiError = require("../Utils/appError");


exports.creatOrder = catshAsync(async (req, res, next) => {
    const {  id,meatId, branchId, orderDate, totalPrice,addsId,customerNmme,address } = req.body;

    try {
        const order = await Order.create({_id:id, meatId, branchId, orderDate, totalPrice ,addsId,customerNmme,address });

        res.status(200).json({
            status: "success",
            order: order
        });
    } catch (error) {
        next(new ApiError(error.message, 500));
    }
});

exports.GetAllOrders = catshAsync(async (req, res, next) => {
    
    const orders = await Order.find();

    if (!orders) {
        return next(new ApiError("Can't find any orders, please try again", 401));
    }

    res.status(200).json({
        status: "success",
        lenght:orders.length,
        data: {
            orders: orders
        }
    });
});

exports.GetMyOrderById = catshAsync(async (req, res, next) => {
    const MyOrder = await Order.findById(req.params.id);


  
   console.log(MyOrder);
    if (!MyOrder) {
        return next(new ApiError("There are no orders yet", 401))
    }

    res.status(200).json({
        status: "success",
        // price:pric,
        data: {
            Orders: MyOrder
        }
    });
});

exports.GetMyOrderByMeatId = catshAsync(async (req, res, next) => {

    const MyOrders = await Order.find({ meatId: req.params.meatId });
    // const pric= MyOrders.meatId
    // console.log(MyOrders.meatId[1]);
    if (!MyOrders) {
        return next(new ApiError("There are no orders yet", 401))
    }

    res.status(200).json({
        status: "success",
       
        lenght:MyOrders.length,
        data: {
            Order: MyOrders
        }
    });
});

exports.CanselOrder=catshAsync(async(req,res,next)=>{
    const MyOrder= await Order.findByIdAndDelete( req.params.id )
    if (!MyOrder) {
        return next(new ApiError("cant cansel order", 401))
    }
    res.status(200).json({
        status: "success",
      message:"order is deleted successfuly"
    });
})
