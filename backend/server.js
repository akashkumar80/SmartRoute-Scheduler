require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require("mongoose");

const connectDB = require("./db");
const authRoutes = require("./routes/auth");
const bodyParser = require('body-parser');
const calenderRoute = require("./routes/calender")
const scheduleRoutes = require("./routes/schedule")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

connectDB()


app.use(express.static(path.join(__dirname, '../frontend')));

app.use("/api/calander", calenderRoute)

app.use("/api/auth", authRoutes);

app.use('/api/schedule', scheduleRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.use((err, req, res, next) => {
  console.error("💥 Server Error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    details: err.message || "Unexpected issue occurred"
  });
});


app.use((req, res, next) => {
  res.status(404).json({
    error: "🚧 Oops! This route doesn't exist.",
    hint: "Try checking the URL or go back to the homepage.",
    route: req.originalUrl
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
