const mongoose=require('mongoose')


const OredrSchema= new mongoose.Schema({

    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "users",
        required: true
      },
      meatId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "meat",
        require: true,
      },
      branchId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:"myBranch",
        required: true,

      },   
      orderDate:{
        type: Date,
        required: true,
      },
       price: {
        type: Number,
        required: true,
      },

},{
    timestamps:true
})

OredrSchema.pre(/^find/,function(next){
  // this.populate("users",["name"])
    this.populate({
        path:"userId",
        select:"name"
    })
    this.populate({
        path:"branchId",
        select:"name"
    })
    this.populate({
        path:"meatId",
        select:["name", "price" ,"img"]
        // select:"name"
    })
    next()
})



const Order= mongoose.model("order",OredrSchema)

module.exports = Order