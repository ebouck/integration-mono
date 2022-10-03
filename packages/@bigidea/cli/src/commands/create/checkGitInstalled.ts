import execa from "execa";
import { program } from "commander";

export default async function checkGitInstalled() {
  try {
    await execa("which", ["git"]);
  } catch (error) {
    console.log("You must have git installed to run the create command");
    program.error("git not found");
  }
}
