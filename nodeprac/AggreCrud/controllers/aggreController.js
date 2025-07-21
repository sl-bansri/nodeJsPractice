const AggreData = require("../models/AggreData");

const getAggreItems = async (req, res) => {
  const item = await AggreData.find();
  // const item = await ItemData.find();
  if (item.length == 0) {
    return res.json({ message: "list is empty create your item first" });
  }
  if (!item) return res.status(204).json({ message: "No item found." });
  res.json(item);
};

const postAggreItem = async (req, res) => {
  if (!req?.body?.product || !req?.body?.price || !req?.body?.quantity) {
    return res.status(400).json({ message: "product are required" });
  }

  try {
    console.log(AggreData);
    const result = await AggreData.create({
      product: req.body.product,
      price: req.body.price,
      quantity: req.body.quantity,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateAggreSummary = async (req, res) => {
  console.log(AggreData, "AggreData");
  try {
    const result = await AggreData.aggregate([
      // {
      // $search: {
      //   index: "default",
      //   text: {
      //     query: "Laptop",
      //     path: "$product",
      //     },
      //   },
      // },

      { $skip: 1 },
      { $limit: 1 },
    ]);
    console.log("res", result);

    if (res) {
      res.status(200).json({ message: `${result}` });
    }
  } catch (err) {
    console.error(err);
    if (res) {
      res.status(500).json({ message: "Error updating product summary" });
    }
  }
};

module.exports = {
  getAggreItems,
  postAggreItem,
  updateAggreSummary,
};
