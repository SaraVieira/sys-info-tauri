import { useEffect, useState } from "react";
import "./App.css";
import { invoke } from "@tauri-apps/api";
import { Disk } from "./components/Disk";
import { Button, Flex, Skeleton, Text } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { SystemInfo } from "./components/SystemInfo";

function bytesToSize(bytes: number) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "n/a";
  const i = parseInt(
    Math.floor(Math.log(bytes) / Math.log(1024)).toString(),
    10
  );
  if (i === 0) return `${bytes} ${sizes[i]})`;
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
}

function App() {
  const [loading, setLoading] = useState(false);
  const [system, setSystem] = useState<any>({});

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    setLoading(true);
    const system = await invoke("refresh_info");
    setSystem(system);
    setLoading(false);
  };

  return (
    <>
      <Flex mb={40} justify={"space-between"}>
        <SystemInfo {...system.system} />
        <Button
          loading={loading}
          onClick={refresh}
          leftIcon={<IconRefresh />}
          variant="light"
        >
          Refresh
        </Button>
      </Flex>
      <Skeleton visible={loading}>
        {system.system && (
          <Disk
            name={"Memory"}
            data={[
              {
                label: bytesToSize(system.system.total_memory),
                part: +(
                  (system.system.used_memory / system.system.total_memory) *
                  100
                ).toFixed(1),
                color: "red",
              },
              {
                label: bytesToSize(
                  system.system.total_memory - system.system.used_memory
                ),
                part: +(
                  ((system.system.total_memory - system.system.used_memory) /
                    system.system.total_memory) *
                  100
                ).toFixed(1),
                color: "green",
              },
            ]}
          />
        )}
        <Text fz="28px" my={20} fw={700}>
          Disks
        </Text>
        <Flex
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
        >
          {system?.disks?.length &&
            system?.disks.map((disk) => (
              <>
                <Disk
                  name={disk.name}
                  ssd={disk.is_removable}
                  data={[
                    {
                      label: bytesToSize(
                        disk.total_space - disk.available_space
                      ),
                      part: +(
                        100 -
                        (disk.available_space / disk.total_space) * 100
                      ).toFixed(1),
                      color: "red",
                    },
                    {
                      label: bytesToSize(disk.available_space),
                      part: +(
                        (disk.available_space / disk.total_space) *
                        100
                      ).toFixed(1),
                      color: "transparent",
                    },
                  ]}
                />
              </>
            ))}
        </Flex>
      </Skeleton>
    </>
  );
}

export default App;
