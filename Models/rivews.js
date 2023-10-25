import { populate } from "dotenv";
import mongoose from "mongoose";
const validate= require ("validator")
const rivewSchem = new mongoose.Schema({
  meatID: {
    type: mongoose.SchemaTypes.ObjectId,
    ref:"meat"
  },
  branchId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref:"branch"
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
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
rivewSchem.pre(/^find/,function(next){
 this.populate({
    path: "userId branchId",
    select: "name",
  });
  next()
})

const rivew= mongoose.model("rivew",rivewSchem)

module.exports = rivew