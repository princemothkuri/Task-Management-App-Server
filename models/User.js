const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
