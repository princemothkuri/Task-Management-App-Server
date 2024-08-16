const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/jwtSecret");

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user; // Attach user information to the request object
    next();
  });
};

module.exports = authenticateToken;
