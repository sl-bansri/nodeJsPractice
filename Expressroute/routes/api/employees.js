// const express = require("express");
// const router = express.Router();
// const fs = require("fs");
// const path = require("path");

// // const dataPath = path.join(__dirname, "../../data/employees.json");

// const readData = () => {
//   const rawData = fs.readFileSync(
//     path.join(__dirname, "../../data/employees.json")
//   );
//   // console.log("rawData", rawData.toString());
//   return JSON.parse(rawData);
// };

// const writeData = (data) => {
//   // console.log("datastring", data);
//   fs.writeFileSync(
//     path.join(__dirname, "../../data/employees.json"),
//     JSON.stringify(data)
//   );
// };

// router.get("/", (req, res) => {
//   const data = readData();
//   res.json(data);
// });

// router.post("/", (req, res) => {
//   const data = readData();
//   // console.log(data, "getnewdata");
//   // console.log("reqbody", req.body);
//   const newItem = req.body;
//   // console.log("newItem", newItem);

//   data.push(newItem);
//   // console.log("newItem-data", data);

//   writeData(data);
//   res.status(201).json(newItem);
// });

// // router.put("/", (req, res) => {
// //   res.json({
// //     firstname: req.body.firstname,
// //     lastname: req.body.lastname,
// //   });
// // });

// // router.route('/:id',(req,res)=>{
// //   res.json({

// //   })
// // })

// module.exports = router;

// const readData = () => {
//   const rawData = fs.readFileSync(
//     path.join(__dirname, "../../data/employees.json")
//   );
//   // console.log("rawData", rawData.toString());
//   return JSON.parse(rawData);
// };

// router.get("/", (req, res) => {
//   const data = readData();
//   res.json(data);
// });

// // router.get("/:id", (req, res) => {
// //   const userId = req.params.id;
// //   res.send(`User ID: ${userId}`);
// // });

// router.post("/", (req, res) => {
//   const userData = req.body;
//   console.log("Received user data:", userData);
//   fs.writeFileSync(
//     path.join(__dirname, "../../data/employees.json"),
//     JSON.stringify(userData)
//   );
//   res.status(201).send("User created successfully");
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/:filename", (req, res) => {
  const filename = req.params.filename;

  const rawData = fs.readFileSync(path.join(__dirname, "../../data", filename));

  // console.log("rawdata", rawData);
  JSON.stringify(rawData);
  res.json(`Retrieving file: ${filename} => ${rawData}`);
});

router.post("/:filename", (req, res) => {
  const filename = req.params.filename;
  // console.log(filename, "filename");

  if (fs.existsSync(filename)) {
    return res.send("File already exists");
  }
  const data = JSON.stringify(req.body);
  fs.writeFileSync(path.join(__dirname, "../../data", filename), data);
  res.send("File created");
});

router.put("/:filename", (req, res) => {
  const filename = req.params.filename;
  console.log(filename, "filename");
  // console.log(!fs.existsSync(path.join(__dirname, "../../data", filename)));
  if (!fs.existsSync(path.join(__dirname, "../../data", filename))) {
    return res.send("File not exists");
  }
  const data = JSON.stringify(req.body);
  fs.writeFileSync(path.join(__dirname, "../../data", filename), data);
  res.send(`Updating file: ${filename}`);
});

router.delete("/:filename", (req, res) => {
  const filename = req.params.filename;

  if (!fs.existsSync(path.join(__dirname, "../../data", filename))) {
    return res.send("File not exists");
  }
  const data = JSON.stringify(req.body);
  fs.unlinkSync(path.join(__dirname, "../../data", filename), data);
  res.send(`Deleting file: ${filename}`);
});

module.exports = router;
