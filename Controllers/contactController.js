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


exports.getAllReports=catshAsync(async(req,res,next)=>{
    const Reports= await Contact.find()

    if(!Reports){
        return next(new ApiError("Pleas Enter Your Reports",401))
    }

    res.status(200).json({
        status:"success",
        results:Reports.length,
        data:{
            report:Reports
        }
    })
}

)
exports.deletReports=catshAsync(async(req,res,next)=>{

    const repoID=req.params.id
    const Reports= await Contact.findByIdAndDelete(repoID)

    if(!Reports){
        return next(new ApiError("Not found any reports on this ID",401))
    }

    res.status(200).json({
        status:"success",
        
    })
}

)



// exports.DropAllReports=catshAsync(async(req,res,next)=>{

// const Reports= await Contact


// })

