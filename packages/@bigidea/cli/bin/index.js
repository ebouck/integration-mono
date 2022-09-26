#!/usr/bin/env node

// import { URL } from "url";

require("dotenv").config();
const { program } = require("commander");
const nodemon = require("nodemon");
const Pusher = require("pusher-js");
const pako = require("pako");
const readPackage = require("../src/readPackage");
const compileCode = require("../src/runInContext");
const getPusherCredentials = require("../src/getPusherCredentials");
const cleanupPreviousDeploy = require("../src/cleanupPreviousDeploy");
const deploy = require("../src/deploy");
const runTask = require("../src/runTask");
const saveConsole = require("../src/saveConsole");
const restoreConsole = require("../src/restoreConsole");
const subscribe = require("../src/subscribe");
const unsubscribe = require("../src/unsubscribe");
const execa = require("execa");
const opn = require("better-opn");
const http = require("http");

program
  .name("integration")
  .description("CLI for bigidea integration dev environment");
// program.showHelpAfterError();

program
  .command("create <repo>")
  .description("Create a new integration project directory from template")
  .action(async (repo) => {
    console.log("ready to create repo", repo);

    try {
      await execa("gh", [
        "repo",
        "create",
        repo,
        "--template=ebouck/integration-template",
        "--private",
        "--clone",
      ]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

program
  .command("login")
  .description(
    "Login to get credentials, which are stored in .env in project root"
  )
  .action(async () => {
    await opn(
      "https://integration.bigidea.io/prototype/integrations/envs/dev/setup"
    );

    const server = http.createServer();
    const address = await listen(server, 0, "127.0.0.1");
    const { port } = new URL(address);
    url.searchParams.set("next", `http://localhost:${port}`);
  });

program
  .command("dev")
  .description("Automatically compile and deploy on changes to source")
  .action(async () => {
    const credentials = await getPusherCredentials(program);

    const pusher = new Pusher(credentials.pusherKey, {
      cluster: credentials.pusherCluster,
    });

    const subscription = pusher.subscribe(`user=${credentials.userId}`);

    const handleRunLocal = async (props) => {
      console.log("in handleRunLocal");
      console.log("props", props);
      // const sc = saveConsole();

      const { compressedPayloadB64 } = props;
      const compressedPayload = Buffer.from(compressedPayloadB64, "base64");
      const payloadStr = pako.inflate(compressedPayload, { to: "string" });
      const payload = JSON.parse(payloadStr);

      console.log("payload", payload);

      await runTask(program, {
        taskName: payload.taskName,
        data: payload.data,
        deliveryId: payload.deliveryId,
      });

      // restoreConsole(sc);
    };
    subscription.bind("runLocal", handleRunLocal);

    nodemon({
      ignoreRoot: [".git"],
      watch: ["src", "node_modules/@bigidea/integration-connectors/dist"],
      ext: "js,ts",
      execMap: {
        js: "npm run build",
      },
    });

    nodemon.on("exit", async () => {
      // const sc = saveConsole();

      // const pkg = readPackage(program);
      // const handler = compileCode(program, pkg.main);
      // await handler({ action: "deploy" });

      await deploy(program);

      await unsubscribe(program);
      await subscribe(program);

      // restoreConsole(sc);
    });
  });

program
  .command("deploy")
  .description("Deploy the integrations to the dev environment")
  .action(async () => {
    // const sc = saveConsole();

    // const pkg = readPackage(program);
    // const handler = compileCode(program, pkg.main);
    // await handler({ action: "deploy" });

    await deploy(program);

    await unsubscribe(program);
    await subscribe(program);

    // restoreConsole(sc);
  });

program
  .command("run")
  .description("Run a task")
  .argument("<name>", "Name of task to run")
  .action(async (taskName) => {
    // const sc = saveConsole();

    await runTask(program, { taskName });

    // restoreConsole(sc);
  });

program.option("-p, --print");

program.parse();
