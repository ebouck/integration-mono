import { Command, Option } from "commander";
import startServer from "./startServer";
import getRequestHandler from "./getRequestHandler";
import openBrowser from "./openBrowser";

export const login = new Command("login");

login
  .description(
    "Login to get credentials, which are stored in .env in project root"
  )
  .addOption(new Option("-d, --dev").hideHelp())
  .action(async (options) => {
    const baseUrl = options.dev
      ? "http://127.0.0.1:3000"
      : "https://integration.bigidea.io";

    const localPort = await startServer(getRequestHandler(baseUrl));

    await openBrowser(baseUrl, localPort);
  });
