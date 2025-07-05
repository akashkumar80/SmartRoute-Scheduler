const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  cronofy_access_token: { type: String },
  cronofy_refresh_token: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
