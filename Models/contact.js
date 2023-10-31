const mongoose= require('mongoose')
const validate = require("validator");


const ContactSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"all Contacts have first name"]
    },
    lastName:{
        type:String,
        required:[true,"all Contacts have last name"]
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
    phone:{
        type:Number,
        required: [true, "Contacts must have phone number"],
    },
    company:{
        type:String
    },
    subject:{
        type:String,
        enum:['Aske for Franchise',"Requist","Problem"]
    },
    description:{
        type:String,
        required:[true,"all Contacts have description"]
    },

},{
    timestamps:true
})

const Contact= mongoose.model("contact",ContactSchema)

module.exports=Contact