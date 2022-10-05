import tar, { FileStat } from "tar";
import { TEMP_TGZ_FILE } from "./constants";

export default async function tarSourceCode(fileList: string[]) {
  console.log("Preparing source code");

  await tar.create(
    {
      gzip: true,
      file: TEMP_TGZ_FILE,
      prefix: "project",
      filter(path: string, stat: FileStat): boolean {
        if (path.startsWith("./.git/") || path.startsWith("./node_modules/")) {
          return false;
        }
        console.log("Adding", path);
        return true;
      },
    },
    fileList
  );
}
