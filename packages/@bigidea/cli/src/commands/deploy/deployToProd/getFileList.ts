import execa from "execa";
import os from "os";
import { program } from "commander";

export default async function getFileList() {
  try {
    const result = await execa("git", ["ls-files"]);
    return result.stdout.split(os.EOL);
  } catch (error) {
    console.error(error);
    program.error("Error getting file list");
  }
}
