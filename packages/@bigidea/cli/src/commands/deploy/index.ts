import { Command } from "commander";
import execDeploy from "../../shared/execDeploy";
import unsubscribe from "../../shared/unsubscribe";
import subscribe from "../../shared/subscribe";

export const deploy = new Command("deploy");

deploy
  .description("Deploy the integrations to the dev environment")
  .action(async () => {
    console.log("ready to deploy");
    await execDeploy();
    await unsubscribe();
    await subscribe();
  });
