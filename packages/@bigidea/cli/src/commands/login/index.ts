import { Command, Option } from "commander";
import startServer from "./startServer";
import getRequestHandler from "./getRequestHandler";
import openBrowser from "./openBrowser";

export const login = new Command("login");

login
  .description(
    "Login to get credentials, which are stored in .env in project root"
  )
  .addOption(new Option("--dev").hideHelp())
  .action(async (options) => {
    let baseUrl = "https://integration.bigidea.io";
    if (options.dev) {
      console.log("In dev mode, using http://localhost:3000");
      baseUrl = "http://localhost:3000";
    }

    const localPort = await startServer(getRequestHandler(baseUrl));

    await openBrowser(baseUrl, localPort);
  });
