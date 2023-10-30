const mongoose =require("mongoose")

const OfferSchema= new mongoose.Schema({
branchId:{
    type: mongoose.SchemaTypes.ObjectId,
    ref:"branch",
    require: true,
},
offerInfo:{
    type:String,
    require: true,
    required:[true,"all branches has offers"]
},
images:[String],
sal:{
    type:Number,
    required:[true,'all offers must have sal']
},
offerStart:{
    type:Date,
    required:[true,"all Offers  must have Satart Date"]
},
offerEnd:{
    type:Date,
    required:[true,"all Offers  must have End Date"]
},

},{
    timestamps:true
})

OfferSchema.pre(/^find/,function(next){

    this.populate({
        path:"branchId",
        select:["name", "images","address"]
    })


    next()
})

const Offer= mongoose.model("offer",OfferSchema)

module.exports=Offer