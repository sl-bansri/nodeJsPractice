const express = require("express");
const router = express.Router();
const {
  getAllItems,
  createNewItem,
  updateItem,
  deleteItem,
  getItemId,
} = require("../controllers/itemController");

router.get("/", getAllItems);
router.post("/", createNewItem);
router.put("/", updateItem);
router.delete("/", deleteItem);
router.get("/:id", getItemId);

module.exports = router;
