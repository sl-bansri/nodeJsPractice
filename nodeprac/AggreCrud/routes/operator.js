const express = require("express");
const {
  getOperatorItems,
  postOperatorItem,
  updateOperatorResult,
} = require("../controllers/operatorController");

const {
  getOperatorDate,
  postOperatorDate,
  dateOperatorResult,
} = require("../controllers/dateController");
const router = express.Router();

router.get("/", getOperatorItems);
router.post("/", postOperatorItem);
router.get("/operates", updateOperatorResult);

router.get("/date", getOperatorDate);
router.post("/date", postOperatorDate);
router.get("/update-date", dateOperatorResult);

module.exports = router;
