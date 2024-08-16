const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const errorMiddleware = require("./middleware/errorHandler");

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, the API is working!");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", authMiddleware, taskRoutes);
app.use("/api/users", userRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
