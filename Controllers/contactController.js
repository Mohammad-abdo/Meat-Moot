const Contact= require('../Models/contact')
const catshAsync = require("../Utils/catshAsync");
const ApiError = require("../Utils/appError");


exports.SendReport=catshAsync(async(req,res,next)=>{
    const NewReport= await Contact.create(req.body)

    if(!NewReport){
        return next(new ApiError("Pleas Enter Your Reports",401))
    }

    res.status(200).json({
        status:"success",
        data:{
            report:NewReport
        }
    })
})