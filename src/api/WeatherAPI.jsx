// src/api/WeatherAPI.jsx
import axios from "axios";

// API key should be stored in environment variables in a real app
const API_KEY = "b1b15e88fa797225412429c1c50c122a1";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

/**
 * Fetches weather data for a given city
 * @param {string} cityName - The name of the city to fetch weather data for
 * @returns {Promise<Object>} - Object containing current weather and forecast data
 */
export async function fetchWeatherData(cityName) {
  try {
    // Fetch current weather
    const currentWeatherUrl = `${BASE_URL}/weather?q=${encodeURIComponent(
      cityName
    )}&appid=${API_KEY}&units=metric`;
    const currentRes = await axios.get(currentWeatherUrl);
    const currentData = currentRes.data;

    // Fetch 5-day forecast
    const forecastUrl = `${BASE_URL}/forecast?q=${encodeURIComponent(
      cityName
    )}&appid=${API_KEY}&units=metric`;
    const forecastRes = await axios.get(forecastUrl);
    const forecastData = forecastRes.data;

    return {
      current: currentData,
      forecast: forecastData,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(
        error.response.data.message || `Error: ${error.response.status}`
      );
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response from server. Please check your connection.");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw error;
    }
  }
}
