const User = require("../models/User");

// Get Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Get a Single User by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { email, username } = req.body;
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if email already exists and belongs to a different user
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          message: "Email already exists!",
        });
      }
    }

    // Check if username already exists and belongs to a different user
    if (username && username !== user.username) {
      const usernameExists = await User.findOne({ username });
      if (usernameExists) {
        return res.status(400).json({
          message: "Username already exists!",
        });
      }
    }

    // Update user fields if unique
    user.firstName = req.body?.firstName || user.firstName;
    user.lastName = req.body?.lastName || user.lastName;
    user.email = email || user.email;
    user.phoneNumber = req.body?.phoneNumber || user.phoneNumber;
    user.username = username || user.username;
    user.gender = req.body?.gender || user.gender;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user profile" });
  }
};
