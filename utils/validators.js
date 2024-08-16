const { check, validationResult } = require("express-validator");

// Validation rules for user signup
const signupValidator = [
  check("firstName").notEmpty().withMessage("First name is required"),
  check("lastName").notEmpty().withMessage("Last name is required"),
  check("email").isEmail().withMessage("Invalid email address"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Validation rules for user login
const loginValidator = [
  check("email").isEmail().withMessage("Invalid email address"),
  check("password").notEmpty().withMessage("Password is required"),
];

// Function to validate request data
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { signupValidator, loginValidator, validate };
