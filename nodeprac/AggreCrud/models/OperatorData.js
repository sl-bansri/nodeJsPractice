const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const inheritSchema = new Schema({
//   fruits: {
//     type: String,
//     required: true,
//   },
// });

const operatorSchema = new Schema({
  product: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  favorites: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const OperatorData = mongoose.model("operatorData", operatorSchema);
module.exports = OperatorData;
