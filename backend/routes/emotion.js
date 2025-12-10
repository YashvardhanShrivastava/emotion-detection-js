// backend/routes/emotion.js
const router = require("express").Router();
const EmotionLog = require("../models/EmotionLog");
const auth = require("../middleware/authMiddleware");

// Save emotion log
router.post("/log", auth, async (req, res) => {
  try {
    const { emotion, confidence, source } = req.body;

    const log = await EmotionLog.create({
      user: req.user,
      emotion,
      confidence,
      source,
    });

    res.json({ msg: "Emotion logged", log });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get user history
router.get("/history", auth, async (req, res) => {
  try {
    const logs = await EmotionLog.find({ user: req.user }).sort({
      createdAt: -1,
    });

    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
