const mongoose= require('mongoose')
const validate = require("validator");


const FeedsSchema= new mongoose.Schema({
    branchId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"branch",
        reuired:[true,'all FeedBack belong to main Branch ']
    },
    subject:{
        type:String,
        enum:['Aske for Franchise',"Requist"]
    },
    feed:{
        type:String,
        required:[true,"all Contacts have description"]
    },
    email:{
        type: String,
        trim: true,
        unique: true,
        required: [true, "Contacts must have email"],
        // @ts-ignore
        validate: [validate.isEmail, "Please Privide A valid Email"],
        lowercase: true,
    },
},{
    timestamps:true
})

FeedsSchema.pre(/^find/,function(next){
    this.populate({
        path:"branchId",
        select:["name","contactInfo"]
    })
    next()
})

const Feeds= mongoose.model("feedback",FeedsSchema)

module.exports=Feeds