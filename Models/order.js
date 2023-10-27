const mongoose=require('mongoose')


const OredrSchema= new mongoose.Schema({

    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
      },
      meatId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "house",
      },
      branchId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:"branch"
      },   
      ordDate:{
        type: Date,
        require: true,
      },
       price: {
        type: Number,
        require: true,
      },

},{
    timestamps:true
})

OredrSchema.pre(/^find/,function(next){
    this.populate({
        path:"userTd",
        select:"name"
    }).populate({
        path:"branchId",
        select:"name address"
    }).populate({
        path:"meatId",
        select:"name price img"
    })
})



const Order= mongoose.model("order",OredrSchema)

module.exports = Order