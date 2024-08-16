const Task = require("../models/Task");

// Create Task
exports.createTask = async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;
  const user = req.user.userId;
  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      status,
      user,
    });

    await newTask.save();
    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Tasks
exports.getTasks = async (req, res) => {
  const userId = req.user.userId;

  try {
    // Find tasks where the 'user' field matches the userId
    const tasks = await Task.find({ user: userId });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { title, description, dueDate, priority, status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, dueDate, priority, status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
