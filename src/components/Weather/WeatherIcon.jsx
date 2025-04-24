import {
    IconSun,
    IconMoon,
    IconCloud,
    IconCloudRain,
    IconCloudFog,
    IconCloudSnow,
    IconCloudStorm,
  } from "@tabler/icons-react"
  import { useMantineTheme } from "@mantine/core"
  
  export function WeatherIcon({ condition, iconCode, size = 24 }) {
    const theme = useMantineTheme()
  
    // Map OpenWeatherMap icon codes to more specific conditions
    const timeOfDay = iconCode.includes("d") ? "day" : "night"
    const iconId = iconCode.slice(0, 2)
  
    // Return the appropriate icon component based on condition and time of day
    switch (condition.toLowerCase()) {
      case "clear":
        return timeOfDay === "day" ? (
          <IconSun size={size} color={theme.colors.yellow[5]} />
        ) : (
          <IconMoon size={size} color={theme.colors.blue[3]} />
        )
      case "clouds":
        return iconId === "02" ? (
          <IconCloud size={size} color={theme.colors.blue[4]} />
        ) : (
          <IconCloud size={size} color={theme.colors.gray[4]} />
        )
      case "rain":
      case "drizzle":
        return <IconCloudRain size={size} color={theme.colors.blue[5]} />
      case "thunderstorm":
        return <IconCloudStorm size={size} color={theme.colors.violet[5]} />
      case "snow":
        return <IconCloudSnow size={size} color={theme.colors.blue[2]} />
      case "mist":
      case "smoke":
      case "haze":
      case "dust":
      case "fog":
        return <IconCloudFog size={size} color={theme.colors.gray[4]} />
      default:
        return <IconCloud size={size} color={theme.colors.gray[4]} />
    }
  }
  