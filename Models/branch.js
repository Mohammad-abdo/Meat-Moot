import mongoose from "mongoose";

const branchSchem = new mongoose.Schema({
  name: {
    type: String,
    required: [true,'Branch Must have name'],
  },
  address: {
    type: String,
    required: [true,'Branch Must have address'],
  },
  imgages:[String],
  offers: {
    type: mongoose.SchemaTypes.ObjectId,
    ref:"offer"
   },
lang:{
    type: Number,
    required: [true,'Branch Must have lang'],
},
lat:{
    type: Number,
    required: [true,'Branch Must have lat'],
},
Currency:{
    type:String,
    required:[true,'Branch Must Have Currency'],
    enum:{
        values:['$',"EGP"],
        message:'Currency Either : $, EGP '
    },
    default:'EGP'
},
info:{
    type:String,
    required:[true,'Branch Must Have informtions'],
},
region:{
    type:String,
    required:[true,'Product Must Have Region'],
    enum:{
        values:['Africa',"Asia",'Europe','latin america','USA',],
        message:'Region Either : Africa, Asia ,latin america,USA,'
    },
    default:'Africa'
},
country:{
    type:String,
    required:[true,'Branch Must have Country']
}

},{
    timestamps:true
},
// @ts-ignore
{
    toJSON:{virtuals:true},
    toOject:{virtuals:true},
});


const branch= mongoose.model("branch",branchSchem)

module.exports = branch