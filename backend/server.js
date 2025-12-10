// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

// CORS FIX
app.use(
  cors({
    origin: [
      "https://emotion-detection-js.netlify.app",
      "http://127.0.0.1:5500",
      "http://localhost:5500"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Body Parser
app.use(express.json());

// Connect DB
connectDB();

// Test Route (FIXED – only one response)
app.get("/", (req, res) => {
  res.send("API running successfully 🎉");
});

// API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/emotion", require("./routes/emotion"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
