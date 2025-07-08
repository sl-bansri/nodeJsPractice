// const data = {};
// data.employees = require("../model/employees.json");

// const getAllEmployee = (req, res) => {
//   res.json(data.employees);
// };

// const createNewEmployee = (req, res) => {
//   res.json({
//     filename: req.body.filename,
//     text: req.body.text,
//   });
// };

// const updateEmployee = (req, res) => {
//   res.json({
//     filename: req.body.filename,
//     text: req.body.text,
//   });
// };

// const deleteEmployee = (req, res) => {
//   res.json({
//     id: req.body.id,
//   });
// };

// const getEmployee = (req, res) => {
//   res.json({
//     id: req.params.id,
//   });
// };

// module.exports = {
//   getAllEmployee,
//   createNewEmployee,
//   updateEmployee,
//   deleteEmployee,
//   getEmployee,
// };

// second practice
const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getAllEmployee = (req, res) => {
  res.json(data.employees);
};

const createNewEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res
      .status(400)
      .json({ message: "firstname and lastname are required" });
  }
  data.setEmployees([...data.employees, newEmployee]);
  res.json(data.employees);
};

const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `employee Id ${req.body.id} not found` });
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  const unsortedArray = [...filteredArray, employee];
  data.setEmployees(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  data.setEmployees([...filteredArray]);
  res.json(data.employees);
};

const getEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.params.id} not found` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployee,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
