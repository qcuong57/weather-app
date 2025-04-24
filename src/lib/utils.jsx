// Format date with timezone offset
export function formatDate(timestamp, timezoneOffset = 0) {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(date)
  }
  
  // Format time with timezone offset
  export function formatTime(timestamp, timezoneOffset = 0) {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }
  
  // Get day name from timestamp
  export function getDayName(timestamp, timezoneOffset = 0) {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date)
  }
  
  // Convert temperature from Celsius to Fahrenheit
  export function celsiusToFahrenheit(celsius) {
    return Math.round((celsius * 9) / 5 + 32)
  }
  
  // Group forecast data by day and include hourly forecasts
  export function groupForecastByDay(forecastList, timezoneOffset = 0) {
    const days = {}
  
    forecastList.forEach((item) => {
      const date = new Date(item.dt * 1000)
      const dateKey = date.toISOString().split("T")[0]
  
      const hourlyForecast = {
        time: formatTime(item.dt * 1000),
        temp: Math.round(item.main.temp),
        condition: item.weather[0].main,
        icon: item.weather[0].icon,
        humidity: item.main.humidity,
        windSpeed: Math.round(item.wind.speed * 3.6), // Convert m/s to km/h
      }
  
      if (!days[dateKey]) {
        days[dateKey] = {
          date: formatDate(item.dt * 1000),
          day: getDayName(item.dt * 1000),
          temps: [item.main.temp],
          conditions: [item.weather[0].main],
          icons: [item.weather[0].icon],
          humidity: [item.main.humidity],
          windSpeed: [item.wind.speed],
          hourlyForecasts: [hourlyForecast],
        }
      } else {
        days[dateKey].temps.push(item.main.temp)
        days[dateKey].conditions.push(item.weather[0].main)
        days[dateKey].icons.push(item.weather[0].icon)
        days[dateKey].humidity.push(item.main.humidity)
        days[dateKey].windSpeed.push(item.wind.speed)
        days[dateKey].hourlyForecasts.push(hourlyForecast)
      }
    })
  
    // Process each day to get aggregated data
    return Object.values(days)
      .map((day) => {
        // Find most common condition
        const conditionCounts = day.conditions.reduce((acc, condition) => {
          acc[condition] = (acc[condition] || 0) + 1
          return acc
        }, {})
  
        const mostCommonCondition = Object.entries(conditionCounts).sort((a, b) => b[1] - a[1])[0][0]
  
        // Find most common icon
        const iconCounts = day.icons.reduce((acc, icon) => {
          acc[icon] = (acc[icon] || 0) + 1
          return acc
        }, {})
  
        const mostCommonIcon = Object.entries(iconCounts).sort((a, b) => b[1] - a[1])[0][0]
  
        return {
          date: day.date,
          day: day.day,
          temp: Math.round(day.temps.reduce((sum, temp) => sum + temp, 0) / day.temps.length),
          high: Math.round(Math.max(...day.temps)),
          low: Math.round(Math.min(...day.temps)),
          condition: mostCommonCondition,
          icon: mostCommonIcon,
          humidity: Math.round(day.humidity.reduce((sum, hum) => sum + hum, 0) / day.humidity.length),
          windSpeed: Math.round((day.windSpeed.reduce((sum, speed) => sum + speed, 0) / day.windSpeed.length) * 3.6),
          hourlyForecasts: day.hourlyForecasts,
        }
      })
      .slice(0, 5) // Limit to 5 days
  }
  
  // Process weather data from API response
  export function processWeatherData(apiData) {
    // Process current weather data
    const current = {
      city: apiData.current.name,
      country: apiData.current.sys.country,
      temp: Math.round(apiData.current.main.temp),
      feelsLike: Math.round(apiData.current.main.feels_like),
      condition: apiData.current.weather[0].main,
      description: apiData.current.weather[0].description,
      icon: apiData.current.weather[0].icon,
      humidity: apiData.current.main.humidity,
      windSpeed: Math.round(apiData.current.wind.speed * 3.6), // Convert m/s to km/h
      pressure: apiData.current.main.pressure,
      visibility: Math.round(apiData.current.visibility / 1000), // Convert m to km
      date: formatDate(apiData.current.dt * 1000),
      time: formatTime(apiData.current.dt * 1000),
      sunrise: formatTime(apiData.current.sys.sunrise * 1000),
      sunset: formatTime(apiData.current.sys.sunset * 1000),
    }
  
    // Group forecast by day and include hourly data
    const forecast = groupForecastByDay(apiData.forecast.list)
  
    return { current, forecast }
  }
  