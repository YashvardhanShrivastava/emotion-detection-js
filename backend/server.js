// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

// -------------------------------
// ✅ CORS FIX (Works for Render + Netlify)
// -------------------------------
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl)
      if (!origin) return callback(null, true);

      // Accept Netlify + localhost + any valid domain
      const allowedOrigins = [
        "https://emotion-detection-js.netlify.app",
        "http://127.0.0.1:5500",
        "http://localhost:5500"
      ];

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // allow all for now
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// -------------------------------
// Parse JSON bodies
// -------------------------------
app.use(express.json());

// -------------------------------
// Connect Database
// -------------------------------
connectDB();

// -------------------------------
// Test Route
// -------------------------------
app.get("/", (req, res) => {
  res.send("API running successfully 🎉");
});

// -------------------------------
// API Routes
// -------------------------------
app.use("/api/auth", require("./routes/auth"));
app.use("/api/emotion", require("./routes/emotion"));

// -------------------------------
// Start Server
// -------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
