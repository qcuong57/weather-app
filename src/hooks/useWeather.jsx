import { useState } from "react";
import { fetchWeatherData } from "../api/WeatherAPI";
import { processWeatherData } from "../lib/utils";

export function useWeather() {
  const [city, setCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tempUnit, setTempUnit] = useState("C");
  const [hasSearched, setHasSearched] = useState(false);

  const fetchWeatherForCity = async (cityName) => {
    try {
      setLoading(true);
      setError(null);
      const apiData = await fetchWeatherData(cityName);
      const processedData = processWeatherData(apiData);
      setWeatherData(processedData);
      setCity(cityName);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError(err.message || "City not found. Please try again.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      setHasSearched(true);
      fetchWeatherForCity(trimmed);
    }
  };

  const toggleTempUnit = () => {
    setTempUnit((prev) => (prev === "C" ? "F" : "C"));
  };

  return {
    city,
    searchQuery,
    setSearchQuery,
    weatherData,
    loading,
    error,
    tempUnit,
    toggleTempUnit,
    handleSearch,
    hasSearched,
  };
}
