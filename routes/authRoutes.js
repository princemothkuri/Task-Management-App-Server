const express = require("express");
const {
  signup,
  login,
  verifyEmail,
  resetPassword,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-email", verifyEmail);
router.post("/reset-password", resetPassword);

module.exports = router;
