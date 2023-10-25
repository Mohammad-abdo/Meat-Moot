const meat = require("../Models/meat");
const { query } = require("express");
const ApiFeatures = require("../Utils/apiFeatures.js");

exports.Savemeat = async function (req, res) {
  try {
    const newmeat = await meat.create(req.body);
    res.status(201).json({ status: "success", data: { meat: newmeat } });
  } catch (error) {
    res
    .status(404)
    .json({
      status: "failed",
      message: "Failed to save the meat",
      error: error.message,
    });
  }
};

exports.Getmeat = async function (req, res) {
  try {
    const mymeat = await meat.findById(req.params.id);
    res.status(200).json({ status: "success", data: { meat: mymeat } });
  } catch (error) {
    res
    .status(404)
    .json({
      status: "failed",
      message: "Failed to get  any meat",
      error: error.message,
    });
  }
};

exports.deletemeat = async function (req, res) {
  try {
    await meat.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "success" });
  } catch (error) {
    res
    .status(404)
    .json({
      status: "failed",
      message: "Failed to delete the meat",
      error: error.message,
    });
  }
};

exports.GetAllmeats = async function (req, res) {
  try {
    const features = new ApiFeatures(meat.find(), req.query)
      .filter()
      .limitFields()
      .sort()
      .pagination();

    const meats = await features.query;

    res.status(200).json({
      status: "success",
      results: meats.length,
      data: { meats: meats },
    });
  } catch (error) {
    res
      .status(404)
      .json({
        status: "failed",
        message: "Failed to get  any meats",
        error: error.message,
      });
  }
};

exports.gitmeatstats = async function (req, res) {
  try {
    const stats = await meat.aggregate([
      {
        $match: { rate: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rate" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: stats,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: "Failed to get  Stats info",
      error: error.message,
    });
  }
};
exports.updatemeat = async function (req, res) {
  try {
    const update = await meat.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: { update: update },
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Failed to update the meat",
      error: error.message,
    });
  }
};

exports.getMonthlyPlan=async function(req,res){
    try {
        const year= req.params.year * 1
        const plan = await meat.aggregate([
            {
                $unwind:'$createdAt'
            },
            {
                $match:{
                    createdAt:{
                        $gte:new Date(`${year}-01-01`),
                        $lte:new Date(`${year}-12-31`)
                    }
                }
            }
        ])

        if(plan.length == 0 ){
            return res.status(202).json({status: "success",message:`I Cant Find Any meats in ${year} please Chose Valid year` })
        }
        res.status(200).json({
            status: "success",
            data: {monthmeats:plan},
          });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Failed to get data",
            error: error.message,
          });
    }
}
