const mongoose= require("mongoose")


const SalesSchema= new mongoose.Schema({

    branchId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"branch"
    },
    sales:{
        type:Number,
       required:[true,"All Branches Have Sales"]
    },
    
},{
    timestamps:true
})

SalesSchema.pre(/^find/,function(next){

    this.populate({
        path:"branchId",
        select:'-__v'
    })

})


const Sales= mongoose.model("sales",SalesSchema)

module.exports=Sales