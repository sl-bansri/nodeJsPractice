const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema({
  customerId: mongoose.Schema.Types.Number,

  status: {
    type: String,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
  items: [itemSchema],
});

const orderData = mongoose.model("Order", orderSchema);

module.exports = {
  orderData,
};
