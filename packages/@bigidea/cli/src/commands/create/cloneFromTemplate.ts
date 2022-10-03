import { program } from "commander";
import execa from "execa";
import * as path from "path";
import fse from "fs-extra";

const TEMPLATE_URL = "https://github.com/ebouck/integration-template";

export default async function cloneFromTemplate(projectName: string) {
  console.log("Cloning from template into directory", projectName);

  try {
    await execa("git", [
      `clone`,
      TEMPLATE_URL,
      projectName,
      `--recursive`,
      `--depth=1`,
      `--quiet`,
    ]);
  } catch (error) {
    console.log(error);
    program.error("Error cloning repo");
  }

  try {
    await fse.remove(path.join(projectName, `.git`));
  } catch (error) {
    console.log(error);
    program.error("Error removing .git");
  }
}
