const itemData = require("../models/ItemData");

const getAllItems = async (req, res) => {
  console.log(itemData, "...... itemData");
  const item = await itemData.find();
  if (item.length == 0) {
    return res.json({ message: "list is empty create your item first" });
  }
  // console.log(item.length, "item");
  if (!item) return res.status(204).json({ message: "No item found." });
  res.json(item);
};

const createNewItem = async (req, res) => {
  if (
    !req?.body?.Itemname ||
    !req?.body?.description ||
    !req?.body?.price ||
    !req?.body?.inStock
  ) {
    return res.status(400).json({ message: "Details are required" });
  }

  try {
    console.log(itemData);
    const result = await itemData.create({
      Itemname: req.body.Itemname,
      description: req.body.description,
      price: req.body.price,
      inStock: req.body.inStock,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateItem = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const item = await itemData.findOne({ _id: req.body.id }).exec();
  console.log("items", item);
  if (!item) {
    return res
      .status(204)
      .json({ message: `No item matches ID ${req.body.id}.` });
  }
  if (req.body?.Itemname) item.Itemname = req.body.Itemname;
  if (req.body?.description) item.description = req.body.description;
  if (req.body?.price) item.price = req.body.price;
  if (req.body?.inStock) item.inStock = req.body.inStock;

  const result = await item.save();
  res.json(result);
};

const deleteItem = async (req, res) => {
  if (!req?.body?.id) {
    return res.sendStatus(400).json({ message: "Item Id is required" });
  }
  const items = await itemData.findOne({ _id: req.body.id }).exec();

  if (!items) {
    return res
      .status(400)
      .json({ message: `item ID ${req.body.id} not found` });
  }
  const result = await itemData.deleteOne({ _id: req.body.id });
  res.json(result);
  console.log(items);
};

const getItemId = async (req, res) => {
  if (!req?.params?.id) {
    return res.sendStatus(400).json({ message: "Item Id is required" });
  }
  const items = await itemData.findOne({ _id: req.params.id });
  if (!items) {
    return res
      .status(400)
      .json({ message: `Item ID ${req.params.id} not found` });
  }
  res.json(items);
};

module.exports = {
  getAllItems,
  createNewItem,
  updateItem,
  deleteItem,
  getItemId,
};
