// backend/models/EmotionLog.js
const mongoose = require("mongoose");

const EmotionLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    emotion: {
      type: String,
      required: true,
    },
    confidence: {
      type: Number,
      default: 0,
    },
    source: {
      type: String, // "webcam" | "image-upload"
      default: "webcam",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmotionLog", EmotionLogSchema);
