const express = require("express");
const router = express.Router();
const { getCustomer, newCustomer } = require("../controller/userController");
const {
  getOrder,
  newOrder,
  getAgreegateData,
} = require("../controller/orderController");

router.get("/aggregate", getAgreegateData);
router.get("/order", getOrder);
router.post("/order", newOrder);
router.get("/", getCustomer);
router.post("/", newCustomer);

module.exports = router;
