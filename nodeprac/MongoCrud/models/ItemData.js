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

const itemData = mongoose.model("Item", itemSchema);
module.exports = itemData;
