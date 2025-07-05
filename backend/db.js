const mongoose = require("mongoose");

const { MONGOOSE_URL } = require("./constants/envVariable")

const connectDB = async () => {
  try {
    await mongoose.connect(MONGOOSE_URL || "mongodb://localhost:27017/smartroute");
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
