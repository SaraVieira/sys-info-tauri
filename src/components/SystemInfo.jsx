import { Avatar, Text, Group } from "@mantine/core";

export function SystemInfo({ name, host_name, kernel_version, os_version }) {
  return (
    <div>
      <Group wrap="nowrap" mb={40}>
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

          <Text fz="lg" fw={500}>
            {name}
          </Text>

          <Group wrap="nowrap" mt={3}>
            <Text fz="xs" c="dimmed">
              Version: {os_version}
            </Text>
          </Group>

          <Group wrap="nowrap" mt={5}>
            <Text fz="xs" c="dimmed">
              Kernel Version: {kernel_version}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}
