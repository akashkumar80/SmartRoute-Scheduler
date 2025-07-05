document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("signupMessage");

  try {
    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, password })
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "index.html"; // redirect on success
    } else {
      message.textContent = data.message;
    }
  } catch (err) {
    message.textContent = "Server error. Please try again later.";
  }
});