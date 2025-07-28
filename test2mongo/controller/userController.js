const { customerData } = require("../model/Customer");

const getCustomer = async (req, res) => {
  const customer = await customerData.find();
  //   console.log(customer);
  if (customer.length == 0) {
    return res.json({ message: "list is empty create your customer first" });
  }
  if (!customer) return res.status(204).json({ message: "No customer found." });
  res.json(customer);
};

const newCustomer = async (req, res) => {
  try {
    const { customerName, customerId, city } = req.body;
    if (!customerId || !city || !customerName) {
      res.json({ message: "customerId and City is not valid " });
    }
    const newCustomer = new customerData({
      customerName: customerName,
      customerId: customerId,
      city: city,
    });

    const savedData = await newCustomer.save();

    res.status(201).json(savedData);
  } catch (error) {
    console.error("Error in adding new customer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  getCustomer,
  newCustomer,
};
