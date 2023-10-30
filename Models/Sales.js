const mongoose= require("mongoose")


const SalesSchema= new mongoose.Schema({

    branchId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"branch"
    },
    salesDate:{
        type:Date
    },
    Salearnings:Number,
    daySales:Number,
    weekSales:Number,
    monthSales:Number,
    yearSales:Number,
    
},{
    timestamps:true
})

SalesSchema.pre(/^find/,function(next){

    this.populate({
        path:"branchId",
        select:'name'
    })
    next()
})


const Sales= mongoose.model("sales",SalesSchema)

module.exports=Sales