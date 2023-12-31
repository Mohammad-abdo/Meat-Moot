const express = require("express");

const app = express();

const dotenv = require("dotenv");

// @ts-ignore
const UserSchema = require("./Router/UserRouter");
const MeatSchema = require("./Router/MeatRouter");
const ReviweSchema=require("./Router/ReviwsRouter")
const branchschema=require("./Router/BranchRouter")
const OrdersSchema = require("./Router/OrderRoute");
const BranchSchema=require('./Router/BranchRouter')
const OffersSchema = require("./Router/OfferRouter");
const SalesSchema = require("./Router/Sales.Router");
const AddsSchema = require("./Router/AddsRouter");
const ContactSchema = require("./Router/ContactRouter");
// const ContactSchema = require("./Router/AddsRouter");


const AppError = require("./Utils/appError");
const GlobalErrorHandeler = require("./Controllers/errorController");
const rateLimit =require("express-rate-limit")
const helmet =require("helmet")
const xss = require("xss-clean");

dotenv.config({ path: "./config.env" });


const morgan = require("morgan");

const cors = require("cors");
app.use(cors());


// Connect to MongoDB

// Middleware to parse JSON request bodies
// app.use(express.json({limit:"300kb"}));
app.use(express.json());

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
  console.log( req.requestTime);

  next();
});


app.use("/api/v1/Branch",BranchSchema);
app.use("/api/v1/Users", UserSchema);
app.use("/api/v1/Meats",MeatSchema);
app.use("/api/v1/Reviwes",ReviweSchema);
app.use("api/v1/branch",branchschema)
app.use("/api/v1/Orders",OrdersSchema);
app.use("/api/v1/Offers",OffersSchema);
app.use("/api/v1/Sales",SalesSchema);
app.use("/api/v1/Adds",AddsSchema);
app.use("/api/v1/Contact",ContactSchema);
// app.use("/api/v1/Adds",AddsSchema);


app.all("*", (req, res, next) => {
  next(new AppError(`Cant Find ${req.originalUrl} on this Server`, 404));
});

app.use(GlobalErrorHandeler);
module.exports = app;
