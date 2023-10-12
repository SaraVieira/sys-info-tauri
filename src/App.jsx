import { useEffect, useState } from "react";
import "./App.css";
import { invoke } from "@tauri-apps/api";
import { Disk } from "./components/Disk";
import { Button, Flex, Skeleton, Text } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { SystemInfo } from "./components/SystemInfo";
import { bytesToSize, cleanDisks } from "./utils";

function App() {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    setLoading(true);
    const system = await invoke("refresh_info");
    const disks = await cleanDisks(system.disks);
    setInfo({
      ...system,
      disks,
    });
    setLoading(false);
  };

  return (
    <>
      <Flex mb={40} justify={"space-between"}>
        <SystemInfo {...info.system} />
        <Button
          loading={loading}
          onClick={refresh}
          leftIcon={<IconRefresh />}
          variant="light"
        >
          Refresh
        </Button>
      </Flex>
      <Text fz="28px" my={20} fw={700}>
        Disks
      </Text>
      <Skeleton visible={loading}>
        <Flex
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
        >
          {info?.disks?.length &&
            info?.disks.map((disk) => (
              <>
                <Disk
                  key={disk.name}
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
