require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnect");
const PORT = process.env.port || 3500;

connectDB();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/customer", require("./routes/orderData"));

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`${PORT} connected successfully`);
  });
});
