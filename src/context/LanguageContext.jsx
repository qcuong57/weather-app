"use client"

import { createContext, useContext, useState } from "react"

const translations = {
  en: {
    yourCity: "Enter city name",
    temperature: "Temperature",
    humidity: "Humidity",
    windSpeed: "Wind speed",
    today: "Today",
    cloudy: "Cloudy",
    sunny: "Sunny",
    partlyCloudy: "Partly Cloudy",
    changeLanguage: "Change to Vietnamese",
    changeTheme: "Toggle theme",
    search: "Search",
    feelsLike: "Feels like",
    uvIndex: "UV Index",
    pressure: "Pressure",
    visibility: "Visibility",
    hourly: "Hourly Forecast",
    daily: "Daily Forecast",
    error: "Error",
    loading: "Loading...",
    noData: "No data available",
    weatherForecast: "Weather Forecast",
    noCityMessage: "Please enter a city to get the weather.",
    overcastClouds: "Overcast Clouds",
    brokenClouds: "Broken Clouds",
    lightRain: "Light Rain",
    moderateRain: "Moderate Rain",
    heavyRain: "Heavy Rain",
    clearSky: "Clear Sky",
    fewClouds: "Few Clouds",
  },
  vi: {
    yourCity: "Nhập tên thành phố",
    temperature: "Nhiệt độ",
    humidity: "Độ ẩm",
    windSpeed: "Tốc độ gió",
    today: "Hôm nay",
    cloudy: "Có mây",
    sunny: "Nắng",
    partlyCloudy: "Có mây rải rác",
    changeLanguage: "Đổi sang tiếng Anh",
    changeTheme: "Đổi giao diện",
    search: "Tìm kiếm",
    feelsLike: "Cảm giác như",
    uvIndex: "Chỉ số UV",
    pressure: "Áp suất",
    visibility: "Tầm nhìn",
    hourly: "Dự báo theo giờ",
    daily: "Dự báo hàng ngày",
    error: "Lỗi",
    loading: "Đang tải...",
    noData: "Không có dữ liệu",
    weatherForecast: "Dự Báo Thời Tiết",
    noCityMessage: "Vui lòng nhập tên thành phố để xem thời tiết.",
    overcastClouds: "Mây u ám",
    brokenClouds: "Mây đổ vỡ",
    lightRain: "Mưa nhẹ",
    moderateRain: "Mưa vừa",
    heavyRain: "Mưa to",
    clearSky: "Trời quang đãng",
    fewClouds: "Ít mây",
  },
}

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en")

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "vi" : "en"))
  }

  const t = (key) => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, t, toggleLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
