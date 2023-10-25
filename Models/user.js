const mongoose = require("mongoose");
const validate = require("validator");
const bcrypt = require("bcrypt");

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 3,
    max: 30,
    required: [true, "user must have fist Name"],
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "user must have email"],
    validate: [validate.isEmail, "Please Privide A valid Email"],
    lowercase: true,
  },
  photo: String,

  password: {
    type: String,
    required: true,
    minLength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        return el === this.password;
      },

      message: "No matces for password ",
    },
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetTokenExpiresAt: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

UsersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});

UsersSchema.methods.validatePassword = async function (checkedPassword) {
  return await bcrypt.compare(checkedPassword, this.password);
};

// changpassword

UsersSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const ChangedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(ChangedTimeStamp, JWTTimestamp);

    return JWTTimestamp < ChangedTimeStamp;
  } else {
    return false;
  }
};

const Users = mongoose.model("users", UsersSchema);

module.exports = Users;