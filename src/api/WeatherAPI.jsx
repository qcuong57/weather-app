// API key should be stored in environment variables in a real app
const API_KEY = "bd5e378503939ddaee76f12ad7a97608";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

/**
 * Fetches weather data for a given city
 * @param {string} cityName - The name of the city to fetch weather data for
 * @returns {Promise<Object>} - Object containing current weather and forecast data
 */
export async function fetchWeatherData(cityName) {
  try {
    // Fetch current weather
    const currentWeatherUrl = `${BASE_URL}/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`;
    const currentRes = await fetch(currentWeatherUrl);

    if (!currentRes.ok) {
      const errorData = await currentRes.json();
      throw new Error(errorData.message || `Error: ${currentRes.status} ${currentRes.statusText}`);
    }

    const currentData = await currentRes.json();

    // Fetch 5-day forecast
    const forecastUrl = `${BASE_URL}/forecast?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`;
    const forecastRes = await fetch(forecastUrl);

    if (!forecastRes.ok) {
      const errorData = await forecastRes.json();
      throw new Error(errorData.message || `Error: ${forecastRes.status} ${forecastRes.statusText}`);
    }

    const forecastData = await forecastRes.json();

    return {
      current: currentData,
      forecast: forecastData,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}