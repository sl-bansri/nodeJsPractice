const express = require("express");
const router = express.Router();
const data = {};
data.employees = require("../../model/employees.json");
// const verifyJWT = require("../../middleware/verifyJWT");

const employeesController = require("../../controllers/employeesControllers");

router
  .route("/")
  // .get(verifyJWT, employeesController.getAllEmployee) // this is the examplye of one way to use jwt another one is in server.js
  .get(employeesController.getAllEmployee)

  .post(employeesController.createNewEmployee)

  .put(employeesController.updateEmployee)

  .delete(employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
