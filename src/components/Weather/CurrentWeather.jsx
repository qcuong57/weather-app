"use client";

import { Card, Group, Text, Title, Grid } from "@mantine/core";
import { IconDroplet, IconWind, IconEye, IconGauge } from "@tabler/icons-react";
import { useMantineTheme } from "@mantine/core";
import { WeatherIcon } from "./WeatherIcon";
import { useLanguage } from "../../context/LanguageContext";

export function CurrentWeather({ weatherData, formatTemp, tempUnit }) {
  const theme = useMantineTheme();
  const { t } = useLanguage();

  if (!theme || !theme.fn || !theme.colors) {
    return <Text>Loading...</Text>;
  }

  return (
    <Card withBorder radius="md" mb="lg" p={0} className="transition-all duration-300 hover:shadow-lg">
      <div
        style={{
          background: theme.fn.linearGradient(45, theme.colors.blue[6], theme.colors.violet[6]),
          padding: theme.spacing.lg,
          color: theme.white,
          borderTopLeftRadius: theme.radius.md,
          borderTopRightRadius: theme.radius.md,
        }}
      >
        <Group position="apart" align="flex-start">
          <div>
            <Title order={2}>
              {weatherData.current.city}, {weatherData.current.country}
            </Title>
            <Text size="sm" opacity={0.9}>
              {weatherData.current.date} | {weatherData.current.time}
            </Text>
            <Group mt="lg" align="center">
              <Text size={42} weight={300}>
                {formatTemp(weatherData.current.temp)}°{tempUnit}
              </Text>
              <div>
                <Text transform="capitalize" size="xl">
                  {weatherData.current.description}
                </Text>
                <Text size="sm" opacity={0.9}>
                  {t("feelsLike")}: {formatTemp(weatherData.current.feelsLike)}°{tempUnit}
                </Text>
              </div>
            </Group>
          </div>
          <div className="p-2 bg-white/10 rounded-full">
            <WeatherIcon condition={weatherData.current.condition} iconCode={weatherData.current.icon} size={64} />
          </div>
        </Group>
      </div>
      <Card.Section p="md">
        <Grid>
          <Grid.Col span={6} md={3}>
            <Group>
              <IconDroplet size={20} color={theme.colors.blue[5]} />
              <div>
                <Text size="xs" color="dimmed">
                  {t("humidity")}
                </Text>
                <Text weight={500}>{weatherData.current.humidity}%</Text>
              </div>
            </Group>
          </Grid.Col>
          <Grid.Col span={6} md={3}>
            <Group>
              <IconWind size={20} color={theme.colors.blue[5]} />
              <div>
                <Text size="xs" color="dimmed">
                  {t("windSpeed")}
                </Text>
                <Text weight={500}>{weatherData.current.windSpeed} km/h</Text>
              </div>
            </Group>
          </Grid.Col>
          <Grid.Col span={6} md={3}>
            <Group>
              <IconEye size={20} color={theme.colors.blue[5]} />
              <div>
                <Text size="xs" color="dimmed">
                  {t("visibility")}
                </Text>
                <Text weight={500}>{weatherData.current.visibility} km</Text>
              </div>
            </Group>
          </Grid.Col>
          <Grid.Col span={6} md={3}>
            <Group>
              <IconGauge size={20} color={theme.colors.blue[5]} />
              <div>
                <Text size="xs" color="dimmed">
                  {t("pressure")}
                </Text>
                <Text weight={500}>{weatherData.current.pressure} hPa</Text>
              </div>
            </Group>
          </Grid.Col>
        </Grid>
      </Card.Section>
    </Card>
  );
}
