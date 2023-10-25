const User = require("../Models/user");
const catshAsync = require("../Utils/catshAsync");
const jwt = require("jsonwebtoken");
const ApiError = require("../Utils/appError");
const bcrypt = require("bcrypt");
const {promisify}=require("util");

const setToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};
const correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
exports.SaveUser = catshAsync(async (req, res, next) => {
  console.log(req.body);
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });
  // const user =await User.create(req.body)
  const token = setToken(user._id);

  res.status(200).json({
    message: "success",
    token,
    data: { user: user },
  });
});


exports.signin = catshAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new ApiError("Please Provide Email & Password"));
  }
  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  if (!user || !(await correctPassword(password, user.password))) {
    next(new ApiError("UnCorrect Email & Password", 401));
  }
  const token = setToken(user._id);

  res.status(201).json({
    message: "success",
    token: token,
  });
});

exports.protect = catshAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ApiError("Yor are Not Loged in  ", 401));
  }

  const decoded= await promisify(jwt.verify)(token,process.env.JWT_SECRET)

  const exsistUser= await User.findById(decoded.id)
  console.log("decoded :=>", decoded);
  if(!exsistUser){
    return next(new ApiError("The User belonging to this Token  no longer exitst", 401));
  }
  
 if(exsistUser.changedPasswordAfter(decoded.iat)){
  return next(new ApiError("user Changed his password", 401));
 }

 req.user = exsistUser
 console.log("User => ",req.user);
  next();
});

exports.restrictTo=(...roles)=>{
  return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
      return next(new ApiError("Yor have no access to deleat this product  ", 403));
    }
    next()
  }
}


