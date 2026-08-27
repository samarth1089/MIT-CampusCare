const dns = require("dns");

// Fix MongoDB Atlas SRV DNS resolution
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running",
    database:
      mongoose.connection.readyState === 1
        ? "MongoDB CONNECTED"
        : "MongoDB NOT CONNECTED",
  });
});

// Environment variables
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Check MongoDB URI
if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined in .env");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB CONNECTED");
  })
  .catch((err) => {
    console.error("MongoDB NOT CONNECTED");
    console.error("MongoDB connection error:", err.message);
  });

// Start server
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});