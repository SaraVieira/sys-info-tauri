import { Progress, Text, Paper, Flex } from "@mantine/core";
import { IconDeviceSdCard, IconDeviceTablet } from "@tabler/icons-react";

export function Disk({ name, data, ssd }) {
  const Icon = ssd ? IconDeviceSdCard : IconDeviceTablet;
  return (
    <Paper withBorder p="md" radius="md" style={{ flexGrow: 1 }}>
      <Flex justify="space-between" align="center">
        <Text fz="xl" fw={700}>
          {name}
        </Text>
        <Icon size="1.4rem" stroke={1.5} />
      </Flex>

      <Text c="dimmed" fz="sm">
        {data[1].label} of {data[0].label} free
      </Text>

      <Progress.Root size={34} mt={20}>
        {data.map((segment) => (
          <Progress.Section
            key={segment.label}
            value={segment.part}
            color={segment.color}
          >
            {segment.part > 10 && (
              <Progress.Label
                style={{
                  fontSize: 12,
                }}
              >
                {segment.label}
              </Progress.Label>
            )}
          </Progress.Section>
        ))}
      </Progress.Root>
    </Paper>
  );
}