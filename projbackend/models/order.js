const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  count: Number,
  name: String,
  price: Number,
});

const orderSchema = new mongoose.Schema(
  {
    products: [productCartSchema],
    transactionId: {},
    amount: {
      type: Number,
    },
    address: {
      type: String,
      maxlength: 200,
    },
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const ProductCart = mongoose.model("ProductCart", productCartSchema);
const Order = mongoose.model("Order", orderSchema);

module.exports = { Order, ProductCart };
