import { createStyles, Avatar, Text, Group } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface SystemInfoProps {
  name: string;
  host_name: string;
  kernel_version: string;
  os_version: string;
}

export function SystemInfo({
  name,
  host_name,
  kernel_version,
  os_version,
}: SystemInfoProps) {
  const { classes } = useStyles();
  return (
    <div>
      <Group noWrap mb={40}>
        <Avatar
          src={
            "https://e7.pngegg.com/pngimages/217/562/png-clipart-macbook-pro-macos-high-sierra-macos-sierra-content-text-computer.png"
          }
          size={94}
          radius="md"
        />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            {host_name}
          </Text>

          <Text fz="lg" fw={500} className={classes.name}>
            {name}
          </Text>

          <Group noWrap spacing={10} mt={3}>
            <Text fz="xs" c="dimmed">
              Version: {os_version}
            </Text>
          </Group>

          <Group noWrap spacing={10} mt={5}>
            <Text fz="xs" c="dimmed">
              Kernel Version:{kernel_version}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}
