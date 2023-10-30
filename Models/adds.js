const mongoose =require('mongoose');

const addsSchema= new mongoose.Schema({
    sauces:{
        type:[String],
        enum:[ "Lemon butter" ,"White sauce" , "Demi glace ",
         "Honey mustard" , "Dynamite" , "Honey" , "Barbeque sauce"]
    },
    salads:{
        type:[String],
        enum:["Roasted Potato ", "Spicy Potato" , "Mashed Potato" ," Arabic Salad" , "Rocca Salad" , "Turkish Salad" ," Hydria" , "Parsleya"  , 
            "Cherry Tomato" , "Fried Pepper" , "Roasted Garlic" ]
  
    },
    rice:{
        type:String,
        default:"rice"
    },
    beverages:{
        type:[String],
        enum:["Mineral Water" , "Soft Drinks" ]
    }

})

const adds=mongoose.model("adds",addsSchema)
module.exports= adds