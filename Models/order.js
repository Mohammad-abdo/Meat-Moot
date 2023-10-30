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
      addsId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "adds",
        require: true,
        
      },
      branchId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:"branch",
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


OredrSchema.post("save", async function(){

 await Order.aggregate([
  {
    $group:{
      _id:this.orderDate,
      count:{$sum:this.price}
    }
  }
])

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
    this.populate({
        path:"addsId",
        select:["sauces", "salads" ,"rice","beverages"]
        // select:"name"
    })
    next()
})



const Order= mongoose.model("order",OredrSchema)

module.exports = Order