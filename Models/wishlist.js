const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
  },
  meatId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "house",
  },
  branchId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref:"branch"
  },
});

wishlistSchema.pre(/^find/, function (next) {
  this.populate({
    path: "userId houseId branchId",
    select: "-__v",
  });
  next();
});

const Wishlist = mongoose.model("wishlist", wishlistSchema);
module.exports = Wishlist;
