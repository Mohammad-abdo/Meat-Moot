const ApiFeatures=require('../Utils/apiFeatures.js')
const asyncHandler = require('express-async-handler');
const branch = require('../Models/branch.js'); 
const Offer = require('../Models/offer')
const catshAsync = require('../Utils/catshAsync.js');

exports.saveBranch=async function(req,res){
  
 try {
  const newBranch =await branch.create(req.body)
  res.status(200).json({status:"success",data:{branch:newBranch}})
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

exports.getAllBranch = async function (req, res) {
  try {
    const features = new ApiFeatures(branch.find(), req.query)
      .filter()
      .limitFields()
      .sort()
      .pagination();

    const branchs = await features.query;

    res.status(200).json({
      status: "success",
      results: branchs.length,
      data: { branchs: branchs },
    });
  } catch (error) {
    res
      .status(404)
      .json({
        status: "failed",
        message: "Failed to get  any branchs",
        error: error.message,
      });
  }
};

exports.getBranch = async function (req, res) {
  try {
    const mybranch = await branch.findById(req.params.id);
    res.status(200).json({ status: "success", data: { branch: mybranch } });
  } catch (error) {
    res
    .status(404)
    .json({
      status: "failed",
      message: "Failed to get  any branch",
      error: error.message,
    });
  }
};
exports.deleteBranch = async function (req, res) {
  try {
    await branch.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "success" });
  } catch (error) {
    res
    .status(404)
    .json({
      status: "failed",
      message: "Failed to delete the branch",
      error: error.message,
    });
  }
};


exports.GettAllBranchOffers=catshAsync(async(req,res,next)=>{

  const branchOffers=await branch.find({offerId:req.params.id})
  if(!branchOffers){
    return next(new ApiFeatures("this branch has no offer",404))
  }

  res.status(202).json({
    status:"success",
    data:{
      offers:branchOffers
    }
  })

})

exports.updateBranch = async function (req, res) {
  try {
    const update = await branch.findByIdAndUpdate(req.params.id, req.body, {
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
      message: "Failed to update the branch",
      error: error.message,
    });
  }
};
