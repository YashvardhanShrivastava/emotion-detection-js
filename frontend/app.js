// frontend/app.js
const API_BASE = "https://emotion-detection-js.onrender.com/api";

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const messageDiv = document.getElementById("message");

function showMessage(text, isError = false) {
  messageDiv.textContent = text;
  messageDiv.style.color = isError ? "#f87171" : "#6ee7b7";
}

// SIGNUP
if (signupBtn) {
  signupBtn.addEventListener("click", async () => {
    if (!nameInput.value || !emailInput.value || !passwordInput.value) {
      return showMessage("All fields required", true);
    }

    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          password: passwordInput.value.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) return showMessage(data.msg || "Signup failed", true);

      showMessage("Signup successful, now login.");
    } catch (err) {
      console.error("Signup error:", err);
      showMessage("Server error", true);
    }
  });
}

// LOGIN
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    if (!emailInput.value || !passwordInput.value) {
      return showMessage("Email and Password are required", true);
    }

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInput.value.trim(),
          password: passwordInput.value.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("Login failed:", data);
        return showMessage(data.msg || "Login failed", true);
      }

      localStorage.setItem("token", data.token);
      showMessage("Login successful");

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 700);
    } catch (err) {
      console.error("Login error:", err);
      showMessage("Server error", true);
    }
  });
}
