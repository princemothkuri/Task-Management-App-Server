const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

// Sign Up
exports.signup = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    username,
    gender,
  } = req.body;

  try {
    const validGenders = ["male", "female", "other"];
    if (gender && !validGenders.includes(gender)) {
      return res.status(400).json({ error: "Invalid gender value" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      username,
      gender,
    });
    await newUser.save();
    console.log(newUser);

    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.findOne({ username: email });
    }

    // Check if user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Return token and user details
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Verify Email for Forget Password
exports.verifyEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Email verified", success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const email = req.body.email.email;
  const password = req.body.email.password;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    res
      .status(200)
      .json({ message: "Password reset successfully", success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
