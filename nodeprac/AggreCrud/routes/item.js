const express = require("express");
const router = express.Router();
const {
  getAllItems,
  createNewItem,
  updateItem,
  deleteItem,
  getItemId,
} = require("../controllers/itemController");

const {
  getOrderData,
  PostorderItems,
  getOrderItems,
} = require("../controllers/OrderController");

router.post("/orders", PostorderItems);
router.get("/orders", getOrderItems);
router.get("/orders/:userId", getOrderData);
router.get("/", getAllItems);
router.post("/", createNewItem);
router.put("/", updateItem);
router.delete("/", deleteItem);
router.get("/:id", getItemId);

module.exports = router;
