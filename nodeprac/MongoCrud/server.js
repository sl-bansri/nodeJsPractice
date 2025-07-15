require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.port || 3500;
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnect");

connectDB();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/items", require("./routes/item"));

mongoose.connection.once("open", () => {
  console.log("connected to database");
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});
