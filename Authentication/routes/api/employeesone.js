const express = require("express");
const router = express.Router();
const data = {};
data.employees = require("../../model/employees.json");

const employeesController = require("../../controllers/employeesControllers");

router
  .route("/")
  .get(employeesController.getAllEmployee)
  .post(employeesController.createNewEmployee)

  .put(employeesController.updateEmployee)

  .delete(employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
