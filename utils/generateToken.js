const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/jwtSecret");

const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET);
};

module.exports = generateToken;
