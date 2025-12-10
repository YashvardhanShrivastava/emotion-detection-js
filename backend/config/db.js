// backend/config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://yash:yash%4012345@cluster0.9dg5dlw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("MongoDB connected");
  } catch (err) {
    console.error("Mongo error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
