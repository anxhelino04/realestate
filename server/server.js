process.env.JWT_SECRET = "your_secret_key";
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/user");
const loginRoutes = require("./routes/login");
const cors = require("cors");

const app = express();

app.use(express.json());

mongoose;
mongoose
  .connect("mongodb://localhost:27017/usersDB", { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use(cors({ origin: "*" }));
app.use("/api/users", require("./routes/login"));
app.use("/api/login", loginRoutes);
app.use("/api/users", userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

// error handling middleware
app.use((error, req, res, next) => {
  let status = error.statusCode || 500;
  let message = error.message;
  res.status(status).json({ message: message });
});

const verifyToken = require("./middleware/verifyToken");

app.use("/api/someProtectedRoute", verifyToken, (req, res) => {
  // Code for protected route
});
app.get("/api/users", userRoutes );
module.exports = app;
