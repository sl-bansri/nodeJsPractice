const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  Itemname: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  inStock: {
    type: Boolean,
    require: true,
  },
});

const itemData = mongoose.model("Item", itemSchema);
module.exports = itemData;
