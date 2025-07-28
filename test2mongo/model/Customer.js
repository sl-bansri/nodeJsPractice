const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customersSchema = new Schema({
  customerId: {
    type: Number,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});
const customerData = mongoose.model("Customer", customersSchema);

module.exports = {
  customerData,
};
