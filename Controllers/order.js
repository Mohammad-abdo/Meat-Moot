const Order = require("../Models/order"); // Import the Order model
const catshAsync = require("../Utils/catshAsync");
const ApiError = require("../Utils/appError");


exports.creatOrder = catshAsync(async (req, res, next) => {
    const { userId, id,meatId, branchId, orderDate, price } = req.body;

    try {
        const order = await Order.create({_id:id, userId, meatId, branchId, orderDate, price });

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
        lenght:MyOrders.length,
        data: {
            orders: orders
        }
    });
});

exports.GetMyOrderByUserId = catshAsync(async (req, res, next) => {
    const MyOrders = await Order.find({ id: req.params.userID });

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

exports.GetMyOrderByMeatId = catshAsync(async (req, res, next) => {
    const MyOrders = await Order.find({ id: req.params.meatId });

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
    const MyOrder= await Order.findByIdAndDelete(req.params.userId)
    if (!MyOrder) {
        return next(new ApiError("There are no orders yet", 401))
    }
    res.status(200).json({
        status: "success",
      message:"order is deleted successfuly"
    });
})
