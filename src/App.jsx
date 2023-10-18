import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";
import { Disk } from "./components/Disk";
import { Button, Flex, Skeleton, Text } from "@mantine/core";
import { SystemInfo } from "./components/SystemInfo";
import { cleanDisks } from "./utils";

const useSystemInfo = () => {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    getSystemInfo();
  }, []);

  const getSystemInfo = async () => {
    setLoading(true);
    const system = await invoke("system_info");

    const disks = await cleanDisks(system.disks);
    setInfo({
      ...system,
      disks,
    });
    setLoading(false);
  };

  return {
    loading,
    info,
    getSystemInfo,
  };
};

function App() {
  const { loading, info, getSystemInfo } = useSystemInfo();
  return (
    <>
      <Flex mb={40} justify="space-between">
        <SystemInfo {...info.system} />
        <Button loading={loading} onClick={getSystemInfo} variant="light">
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
          {info?.disks &&
            info?.disks.map((disk) => <Disk key={disk.name} {...disk} />)}
        </Flex>
      </Skeleton>
    </>
  );
}

export default App;
