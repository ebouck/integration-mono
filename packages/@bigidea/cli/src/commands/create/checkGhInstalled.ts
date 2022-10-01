import execa from "execa";
import { program } from "commander";

export default async function checkGhInstalled() {
  try {
    await execa("which", ["gh"]);
  } catch (error) {
    console.log(
      "You must have gh (the GitHub command line interface) installed to run the create command"
    );
    console.log("");
    console.log("Installation instructions: https://cli.github.com/");
    console.log("");
    console.log(
      "If you cannot or do not want to install, follow the manual setup instructions at https://docs.bigidea.io/docs/getting-started/set-up-dev-env"
    );
    console.log("");
    program.error("gh not found");
  }
}
