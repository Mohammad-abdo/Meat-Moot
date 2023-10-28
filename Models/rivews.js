const mongoose =require('mongoose')
const validate= require ("validator")
const rivewSchem = new mongoose.Schema({
  meatId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref:"meat",
    require: true

  },
  branchId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref:"branch",
    require: true

  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "users",
    require: true
  },
  rate: {
    type: Number,
    min: 1,
    max: 5,
    default: 1,
    require: true,
  },
  review: {
    type: String,
    require: true,
  },

},{
    timestamps:true
},
);

rivewSchem.pre(/^find/, function(next) {
  this.populate({
    path:"meatId",
    select:["name", "images"]
  });
  this.populate({
    path:"branchId",
    select:["name","address" ]
  });
  this.populate({
    path:"userId",
    select:["name","email"]
  });
  next();
});

const rivews= mongoose.model("rivews",rivewSchem)

module.exports =rivews