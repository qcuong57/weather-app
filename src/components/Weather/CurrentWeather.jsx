import { Card, Group, Text, Title, Grid } from "@mantine/core";
import { IconDroplet, IconWind, IconEye, IconGauge } from "@tabler/icons-react";
import { WeatherIcon } from "./WeatherIcon";
import { useLanguage } from "../../context/LanguageContext";

export function CurrentWeather({ weatherData, formatTemp, tempUnit }) {
  const { t } = useLanguage();

  console.log(weatherData);

  return (
    <Card
      withBorder
      radius="md"
      mb="lg"
      p={0}
      className="transition-all duration-300 hover:shadow-lg"
    >
      <div
        style={{
          background: "linear-gradient(45deg, #3b82f6, #8b5cf6)", // Manually set gradient color
          padding: "1rem", // Manually set padding
          color: "white",
          borderTopLeftRadius: "0.375rem",
          borderTopRightRadius: "0.375rem",
        }}
      >
        <Group position="apart" align="flex-start">
          <div>
            <Title order={2}>
              {weatherData?.current?.city}, {weatherData?.current?.country}
            </Title>
            <Text size="sm" opacity={0.9}>
              {weatherData?.current?.date} | {weatherData?.current?.time}
            </Text>
            <Group mt="lg" align="center" position="center">
              {weatherData?.current?.temp !== undefined ? (
                <Text
                  size={72} 
                  weight={700} 
                  style={{
                    lineHeight: 1.5,
                    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {formatTemp(weatherData.current.temp)}°{tempUnit}
                </Text>
              ) : (
                <Text
                  size={42} // Kích thước chữ nhỏ hơn khi không có dữ liệu
                  weight={500}
                  color="dimmed" // Màu sắc nhạt khi không có dữ liệu
                >
                  N/A
                </Text>
              )}
            </Group>
          </div>
          <div className="p-2 bg-white/10 rounded-full">
            <WeatherIcon
              condition={weatherData?.current?.condition}
              iconCode={weatherData?.current?.icon}
              size={64}
            />
          </div>
        </Group>
      </div>
      <Card.Section p="md">
        <Grid>
          <Grid.Col span={6} md={3}>
            <Group>
              <IconDroplet size={20} color="#3b82f6" />
              <div>
                <Text size="xs" color="dimmed">
                  {t("humidity")}
                </Text>
                <Text weight={500}>{weatherData?.current?.humidity}%</Text>
              </div>
            </Group>
          </Grid.Col>
          <Grid.Col span={6} md={3}>
            <Group>
              <IconWind size={20} color="#3b82f6" />
              <div>
                <Text size="xs" color="dimmed">
                  {t("windSpeed")}
                </Text>
                <Text weight={500}>{weatherData?.current?.windSpeed} km/h</Text>
              </div>
            </Group>
          </Grid.Col>
          <Grid.Col span={6} md={3}>
            <Group>
              <IconEye size={20} color="#3b82f6" />
              <div>
                <Text size="xs" color="dimmed">
                  {t("visibility")}
                </Text>
                <Text weight={500}>{weatherData?.current?.visibility} km</Text>
              </div>
            </Group>
          </Grid.Col>
          <Grid.Col span={6} md={3}>
            <Group>
              <IconGauge size={20} color="#3b82f6" />
              <div>
                <Text size="xs" color="dimmed">
                  {t("pressure")}
                </Text>
                <Text weight={500}>{weatherData?.current?.pressure} hPa</Text>
              </div>
            </Group>
          </Grid.Col>
        </Grid>
      </Card.Section>
    </Card>
  );
}
