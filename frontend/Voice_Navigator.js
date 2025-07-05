let recognition;

function startListening() {
  if (speechSynthesis.speaking) speechSynthesis.cancel();

  if (!('webkitSpeechRecognition' in window)) {
    alert("Sorry, your browser doesn't support voice recognition.");
    return;
  }

  if (recognition) {
    recognition.onresult = null;
    recognition.onerror = null;
    recognition.onend = null;
    recognition.abort(); 
  }

  recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = false;
  recognition.interimResults = false;

  const voiceStatus = document.getElementById("voiceStatus");
  voiceStatus.textContent = "🎧 Listening...";

  recognition.onresult = function (event) {
    const command = event.results[0][0].transcript.toLowerCase().trim();
    voiceStatus.textContent = `✅ Heard: "${command}"`;
    if (command.includes("home")) {
      window.location.href = "index.html";
    } else if (command.includes("dashboard")) {
      window.location.href = "dashboard.html";
    } else if (command.includes("logout")) {
      localStorage.removeItem("token");
      window.location.href = "login.html";
    } else if (command.includes("dark mode")) {
      const toggle = document.getElementById("darkModeToggle");
      if (toggle) {
        toggle.checked = !toggle.checked;
        toggle.dispatchEvent(new Event('change'));
      }
    } else {
      alert(`Command not recognized: "${command}"`);
    }
  };

  recognition.onerror = function () {
    voiceStatus.textContent = "Error during recognition.";
  };

  recognition.onend = function () {
    voiceStatus.textContent = "Voice command ended.";
  };

  recognition.start();
}
