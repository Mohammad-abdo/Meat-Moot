const User = require("../Models/user");
const catshAsync = require("../Utils/catshAsync");
const ApiError = require("../Utils/appError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {promisify}=require("util");
const crypto = require("crypto");
const setToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};
const correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const createSendToken = (user, statusCode, res) => {
  const token = setToken(user._id);
  const cookieOptions={
    expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE_IN  * 24 * 60 * 60 * 1000 ),
    // secure:true,
    httpOnly:true
  }
  res.cookie("token", token, cookieOptions);

  user.password = undefined;

  // if((process.env.NODE_ENV == "production")) cookieOptions.secure=true; 
  res.cookie("jwt",token,cookieOptions)

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: user,
    },
  });
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
  // createSendToken(user, 200, res);/
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
  // const token = setToken(user._id);

  // res.status(201).json({
  //   message: "success",
  //   token: token,
  // });
  createSendToken(user, 201, res);
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

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const exsistUser = await User.findById(decoded.id);
  console.log("decoded :=>", decoded);
  if (!exsistUser) {
    return next(
      new ApiError("The User belonging to this Token  no longer exitst", 401)
    );
  }

  if (exsistUser.changedPasswordAfter(decoded.iat)) {
    return next(new ApiError("user Changed his password", 401));
  }

  req.user = exsistUser;
  console.log("User => ", req.user);
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("Yor have no access to deleat this product  ", 403)
      );
    }
    next();
  };
};

exports.forgetPassword = catshAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("there is no user with this email", 404));
  }

  const resetToken = user.createPasswordResetToken();
  console.log("resetToken", resetToken);

  await user.save({ validateBeforeSave: false });

  // ============ 3 send Email packe to user =============
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/Users/resetPassword/${resetToken}`;
  console.log(resetURL);
  const message = `Forget your Password ?
   Submit a PATCH request with your new Password and ConfirmPassword To : ${resetURL}. \n if didn't forget your password
    . please ignore this message`;
  try {
    console.log(user.email);

    await sendEmail({
      email: user.email,
      subject: "Your Password reset Token (valid for 10 minuts)",
      message,
    });

    res.status(200).json({
      status: "success",
      messgae: "token send to Email",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiresAt = undefined;

    await user.save({ validateBeforeSave: false });

    return next(
      new ApiError(
        "there wase an  Error Sending the Email , tray Again later",
        500
      )
    );
  }
});

exports.resetPassword = catshAsync(async (req, res, next) => {
  console.log("Start");
  // Get your Based in the Toeken
  const hasedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  console.log("Start");
  const user = await User.findOne({
    passwordResetToken: hasedToken,
    passwordResetTokenExpiresAt: { $gt: Date.now() },
  });
  console.log(user.email);
  // if Token has no expired,and there is user, set the new password
  if (!user) {
    return next(new ApiError("Tokenl is invalid or Expired", 400));
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpiresAt = undefined;
  await user.save();

  console.log(user);
  // const token = setToken(user._id);

  // res.status(200).json({
  //   message: "success",
  //   token: token,
  // });
  createSendToken(user, 200, res);

  next();
});

exports.updatePassword = catshAsync(async (req, res, next) => {
  // 1 = get user from DB
  const user = await User.findById(req.user.id).select("+passeord");
  const { email, password } = user;
  const user1 = await User.findOne({ email }).select("+password");

  console.log("user1 ID =>", user1.id);
  console.log("user1 password =>", user1.password);
  // 2=  ckeck if the posted password is correct
  console.log(req.body.curentPassword);
  if (!(await correctPassword(req.body.curentPassword, user1.password))) {
    return next(new ApiError("your current passsword is rong", 401));
  }

  // chang password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;

  user.save();

  // createSendToken(user,200,res)
  res.status(201).json({
    status: "success",
    token,
    message: "Password Updated Successfyly",
  });
});

exports.updateMe = catshAsync(async (req, res, next) => {
  // find user
  const user = await User.findById(req.body.id);
  if (!user) {
    return next(new ApiError("ypur ar not loged in ", 401));
  }

  user.name = req.body.name;
  user.email = req.body.email;
  user.save();
  createSendToken(user, 200, res);
});