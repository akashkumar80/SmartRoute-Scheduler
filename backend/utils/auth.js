const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants/envVariable")

const hashPassword = async (password) => await bcrypt.hash(password, 10);
const comparePassword = async (plain, hashed) => await bcrypt.compare(plain, hashed);

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

module.exports = { hashPassword, comparePassword, generateToken };
