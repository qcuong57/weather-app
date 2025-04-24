import { Card, Grid, Group, Text, Badge } from "@mantine/core";
import { IconDroplet } from "@tabler/icons-react";
import { useMantineTheme } from "@mantine/core";
import { WeatherIcon } from "./WeatherIcon";

export function ForecastList({ forecast, formatTemp, tempUnit }) {
  const theme = useMantineTheme();

  return (
    <div>
      {forecast.map((day, index) => (
        <Card
          key={index}
          withBorder
          radius="md"
          mb="md"
          className="transition-all duration-300 hover:shadow-md"
          sx={
            index === 0
              ? { borderColor: theme.colors.blue[5], borderWidth: 2 }
              : {}
          }
        >
          <Card.Section p="md">
            <Grid>
              {/* Daily Summary */}
              <Grid.Col span={12} md={3}>
                <Group align="flex-start">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                    <WeatherIcon
                      condition={day.condition}
                      iconCode={day.icon}
                      size={40}
                    />
                  </div>
                  <div>
                    <Text weight={700} size="lg">
                      {day.day}
                    </Text>
                    <Text size="sm" color="dimmed">
                      {day.date}
                    </Text>
                    <Group spacing={4} mt={4}>
                      <Text weight={700} size="lg">
                        {formatTemp(day.high)}°
                      </Text>
                      <Text size="sm" color="dimmed">
                        {formatTemp(day.low)}°
                      </Text>
                    </Group>
                    <Badge
                      variant="light"
                      color={
                        day.condition.toLowerCase().includes("rain")
                          ? "blue"
                          : day.condition.toLowerCase().includes("cloud")
                          ? "gray"
                          : "yellow"
                      }
                      mt={4}
                    >
                      {day.condition}
                    </Badge>
                  </div>
                </Group>
              </Grid.Col>

              {/* Hourly Forecast */}
              <Grid.Col span={12} md={9}>
                <div style={{ overflowX: "auto" }}>
                  {/* Use Group here instead of div to apply noWrap */}
                  <Group
                    spacing="xl"
                    noWrap
                    style={{ minWidth: "max-content", padding: "8px 0" }}
                  >
                    {day.hourlyForecasts.map((hourly, hourlyIndex) => (
                      <div
                        key={hourlyIndex}
                        className="text-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
                      >
                        <Text weight={500} size="sm">
                          {hourly.time}
                        </Text>
                        <div className="m-2 p-1">
                          <WeatherIcon
                            condition={hourly.condition}
                            iconCode={hourly.icon}
                            size={28}
                          />
                        </div>
                        <Text weight={500}>{formatTemp(hourly.temp)}°</Text>
                        <Group spacing={4} position="center" mt={4}>
                          <IconDroplet size={12} color={theme.colors.blue[5]} />
                          <Text size="xs">{hourly.humidity}%</Text>
                        </Group>
                      </div>
                    ))}
                  </Group>
                </div>
              </Grid.Col>
            </Grid>
          </Card.Section>
        </Card>
      ))}
    </div>
  );
}
