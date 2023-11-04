const mongoose = require("mongoose");

const BranchOredrSchema = new mongoose.Schema(
  {
    customerNmme:{
        type:String,
        required:true
    },
    address: {
      type: String,
    },
    meatId: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "meat",
        require: true,
      },
    ],
    addsId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "adds",
      require: true,
    },
    branchId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "branch",
      required: true,
    },
    orderDate: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number, // To store the total price of meatId items
    },
  },
  {
    timestamps: true,
  }
);

OredrSchema.post("save", async function () {
  await Order.aggregate([
    {
      $group: {
        _id: this.orderDate,
        count: { $sum: this.price },
      },
    },
  ]);
});

// ======================= get Total Price ======================== //
OredrSchema.pre("save", async function (next) {
  if (this.meatId.length === 0) {
    // If there are no meat items, set the total price to 0
    this.totalPrice = 0;
  } else {
    // Calculate the total price by aggregating prices of referenced meat documents
    const meatPrices = await Promise.all(
      this.meatId.map(async (meatItemId) => {
        const meatItem = await mongoose.model("meat").findById(meatItemId);
        return meatItem.price;
      })
    );

    this.totalPrice = meatPrices.reduce((acc, price) => acc + price, 0);
  }
  next();
});

OredrSchema.pre(/^find/, function (next) {
  this.populate({
    path: "branchId",
    select: "name",
  });
  this.populate({
    path: "meatId",
    select: ["name", "price", "img", "description"],
  });
  this.populate({
    path: "addsId",
    select: ["sauces", "salads", "rice", "beverages"],
  });

  next();
});

const Order = mongoose.model("receipt", BranchOredrSchema);

module.exports = Order;
