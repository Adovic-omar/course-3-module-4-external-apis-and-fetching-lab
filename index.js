document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#weather-form')
  const input = document.querySelector('#state-input')
  const display = document.querySelector('#alerts-display')
  const error = document.querySelector('#error-message')

  if (!form) return

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const state = input.value
    input.value = '' // clear input

    try {
      const res = await fetch(`https://api.weather.gov/alerts/active?area=${state}`)
      const data = await res.json()

      // clear previous content + errors
      display.innerHTML = ''
      error.textContent = ''
      error.classList.add('hidden')

      // show alert count
      display.textContent = `Weather Alerts: ${data.features.length}`

      // show each alert
      data.features.forEach(f => {
        const p = document.createElement('p')
        p.textContent = f.properties.headline
        display.appendChild(p)
      })

    } catch (err) {
      error.textContent = err.message
      error.classList.remove('hidden')
    }
  })
})