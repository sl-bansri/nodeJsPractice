const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  Itemname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
});

const orderSchema = new Schema({
  userId: Number,
  productId: mongoose.Schema.Types.ObjectId,
  quantity: Number,
  orderDate: Date,
});

const Order = mongoose.model("Order", orderSchema);
const ItemData = mongoose.model("Item", itemSchema);
module.exports = { ItemData, Order };
