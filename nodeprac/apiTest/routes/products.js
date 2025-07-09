// Route handlers for product operations
const express = require("express");
const router = express.Router();

const {
  getProductById,
  getAllProduct,
  createNewProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getAllProduct);
router.post("/", createNewProduct);
router.put("/", updateProduct);
router.patch("/:id", patchProduct);
router.delete("/", deleteProduct);
router.get("/:id", getProductById);

module.exports = router;
