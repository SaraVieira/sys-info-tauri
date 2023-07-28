import { createStyles, Progress, Text, Group, Paper } from "@mantine/core";
import { IconDeviceSdCard, IconDeviceTablet } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  progressLabel: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    fontSize: theme.fontSizes.sm,
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },
}));

interface DiskProps {
  name: string;
  ssd?: boolean;
  data: {
    label: string;
    part: number;
    color: string;
  }[];
}

export function Disk({ name, data, ssd }: DiskProps) {
  const { classes } = useStyles();
  const Icon = ssd ? IconDeviceSdCard : IconDeviceTablet;
  return (
    <Paper withBorder p="md" radius="md" style={{ flexGrow: 1 }}>
      <Group position="apart">
        <Group align="flex-end" spacing="xs">
          <Text fz="xl" fw={700}>
            {name}
          </Text>
        </Group>

        <Icon size="1.4rem" className={classes.icon} stroke={1.5} />
      </Group>

      <Text c="dimmed" fz="sm">
        {data[1].label} of {data[0].label} free
      </Text>

      <Progress
        sections={data.map((segment) => ({
          value: segment.part,
          color: segment.color,
          label: segment.part > 10 ? segment.label : undefined,
        }))}
        size={34}
        classNames={{ label: classes.progressLabel }}
        mt={20}
      />
    </Paper>
  );
}
