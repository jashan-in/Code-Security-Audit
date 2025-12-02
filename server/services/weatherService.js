// Import axios for HTTP requests
import axios from "axios";

/**
 * Fetch weather data from OpenWeather API for the given city
 */
export async function getWeatherData(city) {
  // Get API key from environment
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENWEATHER_API_KEY in environment variables");
  }

  // Build request URL and parameters
  const url = "https://api.openweathermap.org/data/2.5/weather";
  const params = { q: city, appid: apiKey, units: "metric" };

  // Make the GET request
  const response = await axios.get(url, { params });

  // Extract only the useful parts for frontend
  const { name, main, weather, wind, sys } = response.data;

  // Return a JSON object
  return {
    name,
    country: sys?.country,
    temp: main?.temp,
    humidity: main?.humidity,
    windSpeed: wind?.speed,
    condition: weather?.[0]?.main,
    description: weather?.[0]?.description,
    icon: weather?.[0]?.icon
  };
}
