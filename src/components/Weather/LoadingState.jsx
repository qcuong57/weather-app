import { Card, Group, Grid, Skeleton } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";

export function LoadingState() {
  const theme = useMantineTheme();

  // Check if the theme object is available
  if (!theme || !theme.fn || !theme.colors || !theme.spacing) {
    // Theme or theme properties are missing, return null or loading fallback UI
    return <Skeleton height={100} width="100%" />;
  }

  return (
    <>
      <Card withBorder radius="md" mb="lg" p={0}>
        <div
          style={{
            background: theme.fn.linearGradient(
              45,
              theme.colors.blue[6],
              theme.colors.violet[6]
            ),
            padding: theme.spacing.lg,
            borderTopLeftRadius: theme.radius.md,
            borderTopRightRadius: theme.radius.md,
          }}
        >
          <Group position="apart">
            <div>
              <Skeleton height={30} width={180} radius="md" mb={8} />
              <Skeleton height={16} width={140} radius="md" />
              <Group mt="lg">
                <Skeleton height={50} width={80} radius="md" />
                <div>
                  <Skeleton height={24} width={120} radius="md" mb={8} />
                  <Skeleton height={16} width={100} radius="md" />
                </div>
              </Group>
            </div>
            <Skeleton height={64} width={64} radius="xl" />
          </Group>
        </div>
        <Card.Section p="md">
          <Grid>
            {[...Array(4)].map((_, i) => (
              <Grid.Col key={i} span={6} md={3}>
                <Group>
                  <Skeleton height={24} width={24} radius="xl" />
                  <div>
                    <Skeleton height={12} width={60} radius="md" mb={8} />
                    <Skeleton height={16} width={40} radius="md" />
                  </div>
                </Group>
              </Grid.Col>
            ))}
          </Grid>
        </Card.Section>
      </Card>

      {[...Array(3)].map((_, i) => (
        <Card key={i} withBorder radius="md" mb="md">
          <Card.Section p="md">
            <Grid>
              <Grid.Col span={12} md={3}>
                <Group align="flex-start" noWrap>
                  <Skeleton height={40} width={40} radius="xl" />
                  <div>
                    <Skeleton height={20} width={80} radius="md" mb={8} />
                    <Skeleton height={14} width={100} radius="md" mb={8} />
                    <Skeleton height={16} width={60} radius="md" />
                  </div>
                </Group>
              </Grid.Col>
              <Grid.Col span={12} md={9}>
                <Group spacing="xl" noWrap>
                  {[...Array(5)].map((_, j) => (
                    <div key={j} style={{ textAlign: "center" }}>
                      <Skeleton height={14} width={50} radius="md" mb={8} />
                      <Skeleton height={28} width={28} radius="xl" mb={8} />
                      <Skeleton height={16} width={30} radius="md" />
                    </div>
                  ))}
                </Group>
              </Grid.Col>
            </Grid>
          </Card.Section>
        </Card>
      ))}
    </>
  );
}
