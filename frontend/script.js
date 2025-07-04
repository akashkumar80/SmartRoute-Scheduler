document.getElementById('commute-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const source = document.getElementById('source').value;
  const destination = document.getElementById('destination').value;
  const arrivalTime = document.getElementById('arrivalTime').value;

  const responseDiv = document.getElementById('response');
  responseDiv.textContent = 'Scheduling...';

  try {
    const res = await fetch('/api/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source, destination, arrivalTime }),
    });

    const data = await res.json();
    responseDiv.textContent = data.message || 'Done!';
  } catch (err) {
    responseDiv.textContent = 'Error: ' + err.message;
  }
});
