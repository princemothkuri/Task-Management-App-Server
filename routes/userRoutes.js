const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUserProfile,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

// Get Users
router.get("/", getUsers);

// Get a Single User by ID
router.get("/:id", getUserById);

// Update User Profile
router.put("/:id", updateUserProfile);

module.exports = router;
