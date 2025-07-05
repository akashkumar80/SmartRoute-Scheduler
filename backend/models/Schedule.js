const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  arrivalDate: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  smsFrequency: {
    type: String,
    enum: ["once", "daily", "weekly"],
    default: "once",
    required: true
  },
  cronofy_event_id: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Schedule", scheduleSchema);
