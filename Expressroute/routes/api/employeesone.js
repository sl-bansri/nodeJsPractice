const express = require("express");
const router = express.Router();
const data = {};
data.employees = require("../../data/employees.json");

router
  .route("/")
  .get((req, res) => {
    res.json(data.employees);
  })
  .post((req, res) => {
    res.json({
      filename: req.body.filename,
      text: req.body.text,
    });
  })

  .put((req, res) => {
    res.json({
      filename: req.body.filename,
      text: req.body.text,
    });
  })

  .delete((req, res) => {
    res.json({
      id: req.body.id,
    });
  });

router.route("/:id").get((req, res) => {
  res.json({
    id: req.body.id,
  });
});

module.exports = router;
