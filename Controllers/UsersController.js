const modal = require("../Models/user");
const saltRounds = 10;
const bcrypt = require("bcrypt");
const User = require("../Models/user");
const catshAsync= require('../Utils/catshAsync')
const jwt= require('jsonwebtoken')
const ApiError=require('../Utils/appError')


exports.SaveUser = catshAsync(async(req, res,next)=> {
  console.log(req.body);
// const user =await User.create({
//   name:req.body.name,
//   email:req.body.email,
//   password:req.body.password,
//   confirmPassword:req.body.confirmPassword,
// })
const user =await User.create(req.body)
const token= jwt.sign({id:user._id},process.env.JWT_SECRET,{
  expiresIn:process.env.JWT_EXPIRE_IN
})

    res.status(201).json({
      message: "success",
      token,
      data: { user: user },
    });
  
  
});
exports.signin=async (req,res,next)=>{
  const {email,password}=req.body
  if(!email || !password){
return new ApiError("Please Provide Email & Password")
  }


}

exports.getAllUser = async function (req, res) {
  try {
    var user = await modal.find();
    res.status(201).json({
      status: "success",
      results: user.length,
      data: { user: user },
    });
  } catch (err) {
    res
      .status(404)
      .json({ status: "faild", message: "can not  find any  todo" });
  }
};
exports.updateMe = async function (req, res) {
  try {
    if (!req.body.email) {
      res.status(400).json({ status: "fail", message: "Email is Not found" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    // const newUserPassword = await bcrypt.hash(newUser.password, saltRounds)
    if (newUser) {
      res
        .status(201)
        .json({
          status: "success",
          UpdateDate: new Date(),
          token: { secret: hashedPassword },
          data: { user: newUser },
        });
    }
  } catch (error) {
    res.status(401).json({ status: "faild", message: error });
  }
};
exports.DeleteUser = async function (req, res) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(201).json({ status: "success" });
  } catch (error) {
    res.status(500).json({ status: "faild", message: error });
  }
};
