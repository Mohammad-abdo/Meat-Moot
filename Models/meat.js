const mongoose = require("mongoose");

const MeatSchem = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: { 
    type: String, 
    required: true 
},
  rate: {
    type: Number,
    default:0 
   
  },
  price:{
    type: Number,
    required: true 

  }
},{
    timestamps:true
},
// @ts-ignore
{
    toJSON:{virtuals:true},
    toOject:{virtuals:true},
});


const Meat= mongoose.model("meat",MeatSchem)

module.exports = Meat;
