const express = require("express");
const {
  getOperatorItems,
  postOperatorItem,
  updateOperatorResult,
} = require("../controllers/operatorController");
const router = express.Router();

router.get("/", getOperatorItems);
router.post("/", postOperatorItem);
router.get("/operates", updateOperatorResult);

module.exports = router;
