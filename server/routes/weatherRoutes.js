import { Router } from "express";
import { getWeatherData } from "../services/weatherService.js";

// Create router instance
const router = Router();

/**
 * GET /api/weather/:city
 * Receives city name from the frontend and returns live weather data.
 */
router.get("/:city", async (req, res) => {
  const city = req.params.city?.trim();

  // If no city name was provided, return an error
  if (!city) {
    return res.status(400).json({ error: "City name is required" });
  }

  try {
    // Call service function to get weather info
    const data = await getWeatherData(city);

    res.json(data);
  } catch (err) {
    // Handling errors
    const status = err?.response?.status || 500;
    if (status === 404) {
      return res.status(404).json({ error: "City not found" });
    }
    console.error("Weather API error:", err?.message || err);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

export default router;
