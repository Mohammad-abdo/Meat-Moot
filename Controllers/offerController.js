const Offer = require('../Models/offer')

const catshAsync = require("../Utils/catshAsync");
const ApiError = require("../Utils/appError");



const SendResponse= async(res,statusCod,next,...arguments)=>{
    try {
        res.status(statusCod).json({
            status:"success",
            data:{
                offer:arguments
            }
        })
    } catch (error) {
        return next(new ApiError(error.message,404))
        
    }
}
exports.CreatOffer=catshAsync(async (req,res,next)=>{
const {branchId,offerInfo,offerEnd,offerStart,sal,images,id}=req.body
const offer=await Offer.create({
    branchId,offerInfo,offerEnd,offerStart,sal,images,_id:id
})

    SendResponse(res,200,next,offer)
})
exports.GetAllOffers=catshAsync(async (req,res,next)=>{
try {
    const offers = await Offer.find()

    if(!offers){
        return next(new ApiError("there is no Offers Now ,please Waite for Ouer New Offers"))
    }

    res.status(201).json({
        status:"success",
        offer:{
            data:offers
        }
    })
} catch (error) {
    return next(new ApiError(error.message,404))
    
}
})
exports.GetOfferByBranchId=catshAsync(async (req,res,next)=>{
    const branchId = req.params.branchId; // Assuming you're passing the branchId as a parameter

    // Use the Mongoose 'find' method to retrieve offers with the specified branchId
    const offers = await Offer.find({branchId:branchId});

    if (!offers) {
        return next(new ApiError("Our branch has no offers yet. Please wait for our new offers."));
    }
    SendResponse(res,201,next,offers)

    res.status(201).json({
        status:"success",
        // results:offers.length,
        data:{
            offers:offers
        }
    })
})
exports.GetOfferById=catshAsync(async (req,res,next)=>{
    console.log(req.params.id);
    const offer = await Offer.findById(req.params.id)
    if(!offer){
        return next(new ApiError("there is no Offers Now ,please Waite for Ouer New Offers"))
    }
    SendResponse(res,201,next,offer)
})
exports.UpdateOffer=catshAsync(async (req,res,next)=>{

})
exports.DeletOffer=catshAsync(async (req,res,next)=>{
    const offer = await Offer.findOneAndDelete(req.params.branchId)
    if(!offer){
        return next(new ApiError("there is no Offers Now ,please Waite for Ouer New Offers"))
    }
    res.status(201).json({
        status:"success",
        message:"Offer Deleted Successfuly"

    })
})