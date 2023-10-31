const feedback=require('../Models/feedback')

const catshAsync = require('../Utils/catshAsync.js');
const ApiError=require('../Utils/appError')



exports.sendFeedBack=catshAsync(async (req,res,next)=>{

const sendFeeds= await feedback.create(req.body)

if(!sendFeeds){
    return next(new ApiError("please sed nd valid veedbake",401))
}

res.status(200).json({
    status:"success",
    data:{
        feed:sendFeeds
    }
})

})

exports.getAllsendFeedBack=catshAsync(async(req,res,next)=>{
    const Feeds= await feedback.find()

    if(!Feeds){
        return next(new ApiError("Pleas send  feeds first",401))
    }

    res.status(200).json({
        status:"success",
        results:Feeds.length,
        data:{
            feeds:Feeds
        }
    })
}

)
exports.deletfeedback=catshAsync(async(req,res,next)=>{

    const repoID=req.params.id
    const Reports= await feedback.findByIdAndDelete(repoID)

    if(!Reports){
        return next(new ApiError("Not found any feeds on this ID",401))
    }

    res.status(200).json({
        status:"success",
        
    })
}

)


exports.updateFeed=catshAsync(async(req,res,next)=>{

    const feddID=req.params.id
    const feed= await feedback.findByIdAndUpdate(feddID,req.body,{
        new: true,
        runValidators: true,
        
    })

    
    if(!feed){
        return next(new ApiError("Not found any feed on this ID",401))
    }

    res.status(200).json({
        status:"success",
        data:{
            feed:feed
        }
        
    })
})


