// Grab the key elements from DOM
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const resultDiv = document.getElementById("weatherResult");

/**
 * Fetch weather info for a given city and display it
 */
async function fetchWeather(city) {
  try {
    // Call backend API
    const res = await fetch(`/api/weather/${encodeURIComponent(city)}`);
    const data = await res.json();

    // Handle the API errors
    if (!res.ok) throw new Error(data?.error || "Request failed");

    // Make icon link 
    const iconUrl = data.icon
      ? `https://openweathermap.org/img/wn/${data.icon}@2x.png`
      : null;

    // Build the HTML dynamically
    resultDiv.innerHTML = `
      <h2>${data.name}${data.country ? ", " + data.country : ""}</h2>
      <div class="muted">${data.condition || ""}${data.description ? " • " + data.description : ""}</div>
      ${iconUrl ? `<img src="${iconUrl}" alt="Weather icon" width="80" height="80">` : ""}
      <div class="stat">Temperature: ${data.temp} °C</div>
      <div class="stat">Humidity: ${data.humidity}%</div>
      <div class="stat">Wind: ${data.windSpeed} m/s</div>
    `;
  } catch (err) {
    // Display error to the user
    resultDiv.innerHTML = `<div class="stat">Error: ${err.message}</div>`;
  }
}

/**
 * Handle button click event
 */
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  // validation
  if (!city) {
    resultDiv.innerHTML = `<div class="stat">Please enter a city.</div>`;
    return;
  }

  // Show loading state while waiting for API response
  resultDiv.innerHTML = `<div class="stat">Loading...</div>`;
  fetchWeather(city);
});

/**
 * Allow pressing Enter instead of clicking search
 */
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});
