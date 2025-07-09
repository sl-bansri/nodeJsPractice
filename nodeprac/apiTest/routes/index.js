const express = require("express");
const productRouter = require("./products");

const router = express.Router();

router.use("/product", productRouter);

module.exports = router;
