const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "login.html";
}

const editId = localStorage.getItem("edit_schedule_id");
const responseDiv = document.getElementById('response');

if (editId) {
  // Fetch data to prefill the form
  fetch(`/api/schedule/${editId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data && !data.message) {
        document.getElementById('source').value = data.source;
        document.getElementById('destination').value = data.destination;
        document.getElementById('arrivalTime').value = data.arrivalTime;
        document.getElementById('arrivalDate').value = data.arrivalDate;
        document.getElementById('smsFrequency').value = data.smsFrequency;
      } else {
        responseDiv.textContent = data.message || 'Failed to load schedule data.';
        localStorage.removeItem('edit_schedule_id');
      }
    })
    .catch(() => {
      responseDiv.textContent = 'Failed to load schedule data.';
      localStorage.removeItem('edit_schedule_id');
    });
}

document.getElementById('commute-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const source = document.getElementById('source').value;
  const destination = document.getElementById('destination').value;
  const arrivalTime = document.getElementById('arrivalTime').value;
  const arrivalDate = document.getElementById('arrivalDate').value;
  const smsFrequency = document.getElementById('smsFrequency').value;

  // responseDiv.textContent = '⏳ Scheduling...';
  responseDiv.innerHTML = `
  <div class="loading">
    <img src="assets/search.gif" alt="Loading..." width="60">
    <p id="fun-fact">🚦 Scheduling your smart commute...</p>
  </div>
`;


  try {
    let url = '/api/schedule/add';
    let method = 'POST';

    if (editId) {
      url = `/api/schedule/${editId}`;
      method = 'PUT';
    }

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ source, destination, arrivalTime, arrivalDate, smsFrequency })
    });

    const data = await res.json();
    if (res.ok) {
      responseDiv.textContent = `✅ ${data.message}`;
      localStorage.removeItem('edit_schedule_id');
    } else {
      responseDiv.textContent = `❌ ${data.message || 'Unauthorized. Please login again.'}`;
      if (res.status === 401) {
        localStorage.removeItem('token');
        setTimeout(() => window.location.href = 'login.html', 1500);
      }
    }
  } catch (err) {
    responseDiv.textContent = '❌ Error: ' + err.message;
  }
});

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
