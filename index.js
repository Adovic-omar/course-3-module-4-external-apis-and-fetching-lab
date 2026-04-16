// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('state-input');
  const button = document.getElementById('fetch-btn');
  const display = document.getElementById('alerts-display');
  const errorDiv = document.getElementById('error-message');

  button.addEventListener('click', async () => {
    const state = input.value.trim().toUpperCase();

    try {
      const response = await fetch(
        `https://api.weather.gov/alerts/active?area=${state}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();

      // Clear previous results
      display.innerHTML = '';

      // Clear error message
      errorDiv.textContent = '';
      errorDiv.classList.add('hidden');

      const alerts = data.features || [];

      // Show count
      const title = document.createElement('h2');
      title.textContent = `Weather Alerts: ${alerts.length}`;
      display.appendChild(title);

      // Show alerts
      alerts.forEach(alert => {
        const p = document.createElement('p');
        p.textContent = alert.properties.headline;
        display.appendChild(p);
      });

    } catch (error) {
      errorDiv.textContent = error.message;
      errorDiv.classList.remove('hidden');
    }

    // ✅ MUST clear input AFTER click (test requires this)
    input.value = '';
  });
});