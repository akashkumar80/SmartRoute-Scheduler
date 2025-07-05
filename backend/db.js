const mongoose = require("mongoose");

const { MONGO_URI } = require("./constants/envVariable")

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI || "mongodb://localhost:27017/smartroute", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
