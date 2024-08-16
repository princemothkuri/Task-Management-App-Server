const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

// Create Task
router.post("/", createTask);

// Get Tasks
router.get("/", getTasks);

// Update Task
router.put("/:id", updateTask);

// Delete Task
router.delete("/:id", deleteTask);

module.exports = router;
