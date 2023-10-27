const MyBranch = require("../Models/Mbranch");
const myBrand= require("../Models/Mbranch")


exports.saveBranch=async function(req,res){
  
    try {
     const newBranch =await MyBranch.create(req.body)
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