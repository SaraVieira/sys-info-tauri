export const cleanDisks = async (disks) =>
  disks.filter(({ mount_point }) => {
    if (
      mount_point === "/var/snap/firefox/common/host-hunspell" ||
      mount_point === "/boot/efi" ||
      mount_point === "/System/Volumes/Data"
    ) {
      return false;
    }

    return true;
  });

export const bytesToSize = (bytes: number) => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "n/a";
  const i = parseInt(
    Math.floor(Math.log(bytes) / Math.log(1024)).toString(),
    10
  );
  if (i === 0) return `${bytes} ${sizes[i]})`;
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
};
