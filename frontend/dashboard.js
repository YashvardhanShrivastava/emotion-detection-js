const API_BASE = "https://emotion-detection-js.onrender.com/api";

// Start webcam
async function startVideo() {
  const video = document.getElementById("video");

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    console.error("Camera error:", err);
  }
}

// Load models from correct CDN
async function loadModels() {
  const MODEL_URL = "https://raw.githubusercontent.com/vladmandic/face-api/master/model/";

  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
}

// Detect emotions realtime
async function detectEmotion() {
  const video = document.getElementById("video");

  video.addEventListener("play", () => {
    setInterval(async () => {
      const result = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (!result) {
        document.getElementById("emotionText").innerText = "No face detected...";
        return;
      }

      const expressions = result.expressions;
      const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);

      const emotion = sorted[0][0];
      const confidence = sorted[0][1];

      document.getElementById("emotionText").innerText =
        `Emotion: ${emotion.toUpperCase()} (${(confidence * 100).toFixed(1)}%)`;

      saveEmotion(emotion, confidence);
    }, 500);
  });
}

// Save emotion to backend
async function saveEmotion(emotion, confidence) {
  const token = localStorage.getItem("token");
  if (!token) return;

  await fetch(`${API_BASE}/emotion/log`, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      emotion,
      confidence,
      source: "webcam"
    })
  });
}

// MAIN
(async function () {
  document.getElementById("emotionText").innerText = "Loading models...";
  await loadModels();

  document.getElementById("emotionText").innerText = "Starting camera...";
  await startVideo();

  detectEmotion();
})();
