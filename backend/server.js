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

app.use("/", calenderRoute)

app.use("/api/auth", authRoutes);

app.use('/api/schedule', scheduleRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
