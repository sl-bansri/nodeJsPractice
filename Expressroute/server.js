const express = require("express");
const app = express();
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const { error } = require("console");
const PORT = process.env.PORT || 3500;

// custom middlewae logger
// header shows from where is request coming from
// then we have to pass filename which we want to create

// app.use(logger);

//Cross origin resources sharing
// const whiteList = [
//   "http://www.google.com",
//   "http://127.0.0.1:5500",
//   "http://localhost:3500",
// ]; // here we have to store the domain to whome you want to give access

// const corsOption = {
//   origin: (origin, callback) => {
//     if (whiteList.indexOf(origin) !== -1 || !origin) {
//       // if domain is present in whitelist then proceed
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by cors"));
//     }
//   },
//   originSuccessStatus: 200,
// };

// app.use(cors(corsOption));

// built in middleware to handle urlencoded data
// in otherwords form data
// 'content-type:application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

//built in middleware for json
app.use(express.json());

// serve static file
app.use("/", express.static(path.join(__dirname, "/public")));
// app.use("/subdir", express.static(path.join(__dirname, "/public")));

// app.use("/subdir", require("./routes/subdir"));
const employeeRouter = require("./routes/api/employees");
app.use("/employees", employeeRouter);

const employeeRouterone = require("./routes/api/employeesone");
app.use("/employeesone", employeeRouterone);
// app.use("/", require("./routes/root"));

// app.get("/{*any}", (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
// });

// app.all("{*any}", (req, res) => {
//   res.status(404);
//   if (req.accepts("html")) {
//     res.sendFile(path.join(__dirname, "views", "404.html"));
//   } else if (req.accepts("json")) {
//     res.json({ error: "404 Not Found" });
//   } else {
//     res.type("txt").send("404 Not Found");
//   }
// });

app.use(errorHandler);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
