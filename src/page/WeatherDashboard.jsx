import { Container, Group, Title, ActionIcon, Card, Text } from "@mantine/core";
import { useMantineTheme, useMantineColorScheme } from "@mantine/core";
import { useLanguage } from "../context/LanguageContext";
import { ThemeToggle } from "../components/UI/ThemeToggle";
import { LanguageToggle } from "../components/UI/LanguageToggle";
import { LoadingState } from "../components/Weather/LoadingState";
import { SearchBar } from "../components/Weather/SearchBar";
import { CurrentWeather } from "../components/Weather/CurrentWeather";
import { ForecastList } from "../components/Weather/ForecastList";
import { useWeather } from "../hooks/useWeather";
import { celsiusToFahrenheit } from "../lib/utils";

export function WeatherDashboard() {
  const {
    searchQuery,
    setSearchQuery,
    weatherData,
    loading,
    error,
    tempUnit,
    toggleTempUnit,
    handleSearch,
    hasSearched,
  } = useWeather();

  const { t } = useLanguage();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const formatTemp = (temp) => {
    return tempUnit === "C" ? temp : celsiusToFahrenheit(temp);
  };

  return (
    <Container size="lg">
      <Group position="apart" mb="xl">
        <Title
          order={1}
          sx={(theme) => ({
            background: theme.fn.linearGradient(
              45,
              theme.colors.blue[5],
              theme.colors.violet[5]
            ),
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          })}
        >
          {t("weatherForecast")}
        </Title>
        <Group>
          <ActionIcon
            variant="outline"
            radius="xl"
            size="lg"
            onClick={toggleTempUnit}
          >
            {tempUnit}°
          </ActionIcon>
          <LanguageToggle />
          <ThemeToggle />
        </Group>
      </Group>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        loading={loading}
      />

      {hasSearched && error && (
        <Card
          withBorder
          p="md"
          radius="md"
          mb="lg"
          sx={{
            backgroundColor: isDark ? theme.colors.red[9] : theme.colors.red[0],
            color: isDark ? theme.white : theme.colors.red[9],
          }}
        >
          {error}
        </Card>
      )}

      {loading && <LoadingState />}

      {hasSearched && weatherData && !error && (
        <>
          <CurrentWeather
            weatherData={weatherData}
            formatTemp={formatTemp}
            tempUnit={tempUnit}
          />
          <ForecastList
            forecast={weatherData.forecast}
            formatTemp={formatTemp}
            tempUnit={tempUnit}
          />
        </>
      )}

      {!hasSearched && !loading && (
        <Text align="center" mt="xl" color="dimmed">
          Please enter a city to get the weather.
        </Text>
      )}
    </Container>
  );
}
