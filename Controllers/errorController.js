// module.exports = (err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || "error";

//      res.status(err.statusCode).json({
//       status: err.status,
//       message: err.message,
//     });
//   next();
// };

// ============= Start new Error Version ==============

// const ApiError = require("../Utils/appError");

// const handelCastErrorDB = (err) => {
//   const message = `invalid ${err.path} :${err.value}`;
//   return new ApiError(message, 400);
// };
// const handelDuplicateDB = (err) => {
//   const value = err.errmsg.match(/(?<=")(?:\\.|[^"\\])*(?=")/);
//   const message = `invalid Duplicated Fileds ${value},Please Use Anthoer Values`;
//   return new ApiError(message, 400);
// };
// const sendErrorsDev = (err, res) => {
//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//     error: err,
//     stack: err.stack,
//   });
// };

// const sendErrorsPro = (err, res) => {
//   if (err.isOperational) {
//     res.status(err.statusCode).json({
//       status: err.status,
//       message: err.message,
//     });
//   } else {
//     res.status(500).json({
//       status: "Error",
//       message: "SomeThing Went Wrong",
//     });
//   }
// };

// const handelJWTError = (err) =>{

//  return new ApiError("invalid token please log again", 401);

// }

// module.exports = (err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || "error";

//   if (process.env.NODE_ENV === "development") {
//     sendErrorsDev(err, res);
//     const error = { ...err };
//     console.log("reeorname", error.name);
//     if (error.name === "JsonWebTokenError") {
//       error =  new ApiError("invalid token please log again", 401);;
//     }
//   } else if (process.env.NODE_ENV === "production") {
//     const error = { ...err };
//     if (error.name === "CastError") error = handelCastErrorDB(error);
//     if (error.name === 11000) error = handelDuplicateDB(error);
//     console.log("reeorname", error.name);
//     if (error.name === "JsonWebTokenError") {
//       error = handelJWTError(error);
//     }
//     sendErrorsPro(err, res);
//   }

//   next();
// };
// ============= End new Error Version ==============
const ApiError = require("../Utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new ApiError(message, 400);
};

const handleDuplicateDB = (err) => {
  const value = err.errmsg.match(/(?<=")(?:\\.|[^"\\])*(?=")/);
  const message = `Invalid Duplicate Fields ${value}. Please use another value.`;
  return new ApiError(message, 400);
};

const sendErrorsDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorsPro = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "Error",
      message: "SomeThing Went Wrong",
    });
  }
};

const handelJWTError = () =>
  new ApiError("Invalid token. Please log in again.", 401);
const handelJWTExpireError = () =>
  new ApiError("Your token got to Expire, Please log in again.", 401);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorsDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    if (err.name === "CastError") err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicateDB(err);
    if (err.name === "JsonWebTokenError") err = handelJWTError();
    if (err.name === "TokenExpiredError") err = handelJWTExpireError();
    sendErrorsPro(err, res);
  }

  next();
};
