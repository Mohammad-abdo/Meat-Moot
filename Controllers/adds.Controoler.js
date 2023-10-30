const Adds= require("../Models/adds")



exports.creatAdd=async(req,res)=>{
    try {
        const  add= await Adds.create(req.body)

        res.status(200).json({
            status:"success",
            data:{
                add
            }
        })
    } catch (error) {
        res.status(404).json({
            status:"success",
           message:error.message
        })
    }
}