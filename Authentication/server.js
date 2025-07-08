const express = require("express");
const app = express();
const cors = require("cors");
const corsOption = require("./config/corsOption");
const { logger } = require("./middleware/logEvents");
const path = require("path");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT");
const errorHandler = require("./middleware/errorHandler");
const { error } = require("console");
const PORT = process.env.PORT || 3500;

// custom middlewae logger
// header shows from where is request coming from
// then we have to pass filename which we want to create

app.use(logger);

//Cross origin resources sharing
//
app.use(cors(corsOption));

// built in middleware to handle urlencoded data , form data
app.use(express.urlencoded({ extended: false }));

//built in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// serve static file
app.use("/", express.static(path.join(__dirname, "/public")));

//routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);

const employeeRouterone = require("./routes/api/employeesone");
app.use("/employeesone", employeeRouterone);

app.all("{*any}", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
