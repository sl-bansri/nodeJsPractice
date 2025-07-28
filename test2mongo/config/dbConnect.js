const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("successfully connected to database");
  } catch (err) {
    console.error(err, "erroe in database connection");
  }
};

module.exports = connectDB;
