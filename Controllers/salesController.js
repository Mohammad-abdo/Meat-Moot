const Sal = require("../Models/Sales");
const Order = require("../Models/order"); // Import the Order model
const catshAsync = require("../Utils/catshAsync");
const ApiError = require("../Utils/appError");

exports.GetAllBranchOrder = catshAsync(async (req, res, next) => {
  const allOrders = await Order.find({ branchId: req.params.branchId });

  const clacSumOrders = await Order.aggregate([
    {
      $group: {
        _id: null,
        count: { $sum: "$price" },
      },
    },
  ]);
  const sum = clacSumOrders[0].count;

  const CreatSal = await Sal.create({
    branchId: req.params.branchId,
    Salearnings: sum,
    salesDate: Date.now(),
  });
  console.log(clacSumOrders[0].count);

  if (!allOrders) {
    return next(new ApiError("Can't find any orders, please try again", 401));
  }
  // sendResponse(res,201,allOrders)
  res.status(200).json({
    status: "success",
    lenght: allOrders.length,
    data: {
      orders: clacSumOrders,
    },
    Sales: {
      TotalSales: CreatSal,
    },
  });
});

exports.GetSalesByBranchId = catshAsync(async (req, res, next) => {
  const Sales = await Sal.find({ branchId: req.params.branchId });

  if (!Sales) {
    return next(new ApiError("Can't find any Sales, please try again", 401));
  }
  res.status(200).json({
    status: "success",
    data: {
      Sales: Sales,
    },
  });
});

exports.GetAllSales = catshAsync(async (req, res, next) => {
  const Sales = await Sal.find();

  if (!Sales) {
    return next(new ApiError("Can't find any Sales, please try again", 401));
  }
  res.status(200).json({
    status: "success",
    results: Sales.length,
    data: {
      Sales: Sales,
    },
  });
});

exports.DeletSalByBranshId = catshAsync(async (req, res, next) => {
  const Sales = await Sal.findByIdAndDelete({ branchId: req.params.branchId });

  if (!Sales) {
    return next(new ApiError("Can't find any Sales, please try again", 401));
  }
  res.status(200).json({
    status: "success",
  });
});

exports.DeletSaleById = catshAsync(async (req, res, next) => {
  const Sales = await Sal.findByIdAndDelete(req.params.id);

  if (!Sales) {
    return next(new ApiError("Can't find any Sales, please try again", 401));
  }
  res.status(200).json({
    status: "success",
  });
});

exports.UpdateSaleByBranchId = catshAsync(async (req, res, next) => {
  const Sales = await Sal.findByIdAndUpdate(
    { branchId: req.params.branchId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!Sales) {
    return next(new ApiError("Can't find any Sales, please try again", 401));
  }
  res.status(200).json({
    status: "success",
    data: {
      Sales: Sales,
    },
  });
});
