const express = require("express");
const router = express.Router();

// const verifyJWT = require("../../middleware/verifyJWT");

const {
  getAllEmployee,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
} = require("../../controllers/employeesControllers");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/roles_list");

// .get(verifyJWT, employeesController.getAllEmployee) // this is the examplye of one way to use jwt another one is in server.js
router.get("/", getAllEmployee);
router.post(
  "/",
  verifyRoles([ROLES_LIST.Admin, ROLES_LIST.Editor]),
  createNewEmployee
);

router.put(
  "/",
  verifyRoles([ROLES_LIST.Admin, ROLES_LIST.Editor]),
  updateEmployee
);

router.delete("/", verifyRoles([ROLES_LIST.Admin]), deleteEmployee);

router.get("/:id", getEmployee);

module.exports = router;
