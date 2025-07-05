const express = require("express");
const User = require("../models/User");
const { hashPassword, comparePassword, generateToken } = require("../utils/auth");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await hashPassword(password);
    const user = await User.create({ name, email, phone, password: hashed });
    const token = generateToken(user);
    res.status(201).json({ token, user: { id: user._id, name, email, phone } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.json({ token, user: { id: user._id, name: user.name, email, phone: user.phone } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
