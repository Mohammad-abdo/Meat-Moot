const express = require("express");

const app = express();

const dotenv = require("dotenv");

// @ts-ignore
const UserSchema = require("./Router/UserRouter");
const MeatSchema = require("./Router/MeatRouter");

const AppError = require("./Utils/appError");
const GlobalErrorHandeler = require("./Controllers/errorController");
dotenv.config({ path: "./config.env" });
app.use(express.json());

const morgan = require("morgan");
const cors = require("cors");
app.use(cors());

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}
// Connect to MongoDB

// Middleware to parse JSON request bodies
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

// Use the UserSchema router
app.use("/api/v1/Users", UserSchema);
// Use the MoviesSchema router
app.use("/api/v1/Meats",MeatSchema)

app.all("*", (req, res, next) => {
  next(new AppError(`Cant Find ${req.originalUrl} on this Server`, 404));
});

app.use(GlobalErrorHandeler);
module.exports = app;
