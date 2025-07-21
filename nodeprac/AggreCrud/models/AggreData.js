const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aggreSchema = new Schema({
  product: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const AggreData = mongoose.model("aggreeData", aggreSchema);
module.exports = AggreData;
