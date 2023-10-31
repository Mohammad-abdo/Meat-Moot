const Reviw = require("../Models/rivews")
const ApiFeatures = require("../Utils/apiFeatures")
const ApiError = require("../Utils/appError")
const user = require("../Models/user")


exports.saveReviw = async (req, res, next) => {
  try {

    const { userId, id, meatId, review, rate, branchId } = req.body
    const NewRreviw = await Reviw.create({ _id: id, userId, meatId, review, rate, branchId })
    res.status(200).json({ status: "success", data: { Reviw: NewRreviw } })

  } catch (error) {
    res
      .status(404)
      .json({
        status: "failed",
        message: "Failed to save the branch",
        error: error.message,
      });
  }
}

exports.getAllReviwes = async (req, res) => {

  try {
    const features = new ApiFeatures(Reviw.find(), req.query)
      .filter()
      .limitFields()
      .sort()
      .pagination();
    const totalReviwes = await features.query;
    res.status(200).json({
      status: "success",
      results: totalReviwes.length,
      data: { reviwes: totalReviwes },
    });
    // const totalReviwes =await Reviw.find()s
    // res.status(200).json({
    //     status: "success",
    //     results: totalReviwes.length,
    //     data: { reviwes: totalReviwes },
    //   });
  } catch (error) {
    res
      .status(404)
      .json({
        status: "failed",
        message: "Failed to get  any Reviwes",
        error: error.message,
      });
  }


}

exports.getReviwesByUserId = async (req, res) => {
  const userId = req.params.userId
  try {
    const singleReviwe = await Reviw.find({ userId  : userId })

    if (!singleReviwe) {
      return res.status(404).json({
        status: "failed",
        message: "No reviews found for this user.",
      });
    }else{

console.log(singleReviwe.length);
      res.status(200).json({
        status: "success n",
        results:singleReviwe.length,
        data: { reviwe: singleReviwe },
      })
    }
  
  } catch (error) {
    res
      .status(404)
      .json({
        status: "failed",
        message: "Failed to get  any Reviwes",
        error: error.message,
      });
  }

}

exports.getReviwesById = async (req, res) => {
  try {
    const singleReviwe = await Reviw.findById(req.params.id)
    console.log(singleReviwe);
    res.status(200).json({
      status: "success",
      data: { reviwe: singleReviwe }
    })
  } catch (error) {
    res
      .status(404)
      .json({
        status: "failed",
        message: "Failed to get  any Reviwes",
        error: error.message,
      });
  }

}

exports.updateReviwesById = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  try {
    let updatedData = await Reviw.findByIdAndUpdate(id, newData, { new: true });
    res.status(201).json({ data: updatedData });

  } catch (error) {
    res.status(500).json({ message: error.message });

  }


}

exports.deleteReviwesById = async (req, res) => {
  try {
    const deleteReviwe = await Reviw.findByIdAndDelete(id, { delete: true });
    res.status(201).json({ data: deleteReviwe });


  } catch (error) {
    res.status(500).json({ message: error.message });

  }
}