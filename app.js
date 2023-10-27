const express = require("express");

const app = express();

const dotenv = require("dotenv");

// @ts-ignore
const UserSchema = require("./Router/UserRouter");
const MeatSchema = require("./Router/MeatRouter");
<<<<<<< HEAD
const BranchSchema = require("./Router/MyBranchRouter");
const xss = require("xss-clean");
=======
const branchschema=require("./Router/BranchRouter")

>>>>>>> 0eb325bbeda45ef0e6897023ec052b43a81ca721
const AppError = require("./Utils/appError");
const GlobalErrorHandeler = require("./Controllers/errorController");

const rateLimit =require("express-rate-limit")
const helmet =require("helmet")

dotenv.config({ path: "./config.env" });


const morgan = require("morgan");

const cors = require("cors");
app.use(cors());


// Connect to MongoDB

// Middleware to parse JSON request bodies
app.use(express.json({limit:"300kb"}));

// Secure header http
app.use(helmet())

app.use(xss());
// limiter  for the user response he send  to  my api 
const limiter= rateLimit({
  max:100,
  windowMs:60 * 60 * 1000,
  message:"To Many Request For this Api ,Please Tray Again in an hour"
})

app.use("/api",limiter)


if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});


app.use("/api/v1/Branch",BranchSchema);
app.use("/api/v1/Users", UserSchema);
<<<<<<< HEAD
app.use("/api/v1/Meats",MeatSchema);
=======
// Use the MoviesSchema router
app.use("/api/v1/Meats",MeatSchema)
app.use("api/v1/branch",branchschema)
>>>>>>> 0eb325bbeda45ef0e6897023ec052b43a81ca721

app.all("*", (req, res, next) => {
  next(new AppError(`Cant Find ${req.originalUrl} on this Server`, 404));
});

app.use(GlobalErrorHandeler);
module.exports = app;
