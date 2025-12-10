// frontend/app.js
const API_BASE = "http://localhost:5000/api";

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

if (signupBtn) {
  signupBtn.addEventListener("click", async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
        }),
      });

      const data = await res.json();
      if (!res.ok) return showMessage(data.msg || "Signup failed", true);

      showMessage("Signup successful, now login.");
    } catch (err) {
      console.error(err);
      showMessage("Error occurred", true);
    }
  });
}

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInput.value,
          password: passwordInput.value,
        }),
      });

      const data = await res.json();
      if (!res.ok) return showMessage(data.msg || "Login failed", true);

      localStorage.setItem("token", data.token);
      showMessage("Login successful");

      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 500);
    } catch (err) {
      console.error(err);
      showMessage("Error occurred", true);
    }
  });
}
