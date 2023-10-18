import { Progress, Text, Paper, Flex } from "@mantine/core";
import { IconDeviceSdCard, IconDeviceTablet } from "@tabler/icons-react";
import { bytesToSize } from "../utils";

export function Disk({ disk }) {
  const Icon = disk.is_removable ? IconDeviceSdCard : IconDeviceTablet;

  const data = [
    {
      label: bytesToSize(disk.total_space - disk.available_space),
      part: +(100 - (disk.available_space / disk.total_space) * 100).toFixed(1),
      color: "red",
    },
    {
      label: bytesToSize(disk.available_space),
      part: +((disk.available_space / disk.total_space) * 100).toFixed(1),
      color: "transparent",
    },
  ];
  return (
    <Paper withBorder p="md" radius="md" style={{ flexGrow: 1 }}>
      <Flex justify="space-between" align="center">
        <Text fz="xl" fw={700}>
          {disk.name}
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
