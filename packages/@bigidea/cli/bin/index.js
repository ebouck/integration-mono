#!/usr/bin/env node
require("dotenv").config();
const { program, Option } = require("commander");
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
const http = require("node:http");
const parseCode = require("../src/util/parseCode");
const fetch = require("node-fetch");
const fs = require("fs");

program
  .name("integration")
  .description("CLI for bigidea integration dev environment");
// program.showHelpAfterError();

program
  .command("create <repo>")
  .description("Create a new integration repo from template and clone it")
  .action(async (repo) => {
    try {
      await execa("which", ["gh"]);
    } catch (error) {
      console.error("gh not found");
      console.log("");
      console.log(
        "You must have gh (the GitHub command line interface) installed to run the create command"
      );
      console.log("");
      console.log("Installation instructions: https://cli.github.com/");
      console.log("");
      console.log(
        "If you cannot or do not want to install, follow the manual setup instructions at https://docs.bigidea.io/docs/getting-started/set-up-dev-env"
      );
      return;
    }

    try {
      await execa("gh", ["repo", "view", repo]);
      console.log(
        `Repo ${repo} already exists. Delete or choose another name to continue.`
      );
      return;
    } catch (error) {
      // continue
    }

    try {
      if (fs.existsSync(repo)) {
        console.log(
          `Directory or file ${repo} already exists. Delete or choose another name to continue.`
        );
        return;
      }
    } catch (error) {
      throw error;
    }

    console.log("Creating and cloning repo", repo);

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

    console.log(`Installing packages to ${repo}`);
    try {
      await execa("npm", ["install"], {
        cwd: repo,
      }).stdout.pipe(process.stdout);
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
  .addOption(new Option("-d, --dev").hideHelp())
  .action(async (options) => {
    const baseUrl = options.dev
      ? "http://127.0.0.1:3000"
      : "https://integration.bigidea.io";

    const callback = async (req, res) => {
      res.statusCode = 302;

      try {
        const code = parseCode(req.url);

        const response = await fetch(`${baseUrl}/api/v1/cli-login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        const text = await response.text();

        if (response.status === 200) {
          const json = JSON.parse(text);
          const { ENV_NAME, BASE_URL, API_KEY } = json;

          try {
            fs.writeFileSync(
              ".env",
              `ENV_NAME=${ENV_NAME}
BASE_URL=${BASE_URL}
API_KEY=${API_KEY}
`
            );
            res.setHeader(
              "location",
              `${BASE_URL}/prototype/cli-login/success`
            );
            console.log("Login successful, wrote .env file");
          } catch (error) {
            res.setHeader(
              "location",
              `${BASE_URL}/prototype/cli-login/failure`
            );
            console.log("Failed to write .env file", error);
          }
        } else {
          res.setHeader("location", `${baseUrl}/prototype/cli-login/failure`);
          console.log("Login failed");
        }
      } catch (error) {
        res.setHeader("location", `${baseUrl}/prototype/cli-login/failure`);
        console.log("Login failed");
      }

      res.end();

      process.exit(0);
    };

    const server = http.createServer(callback);

    await server.listen(0);

    const localPort = server.address().port;

    console.log("Opening your browser to allow you to login");

    await opn(`${baseUrl}/prototype/cli-login/${localPort}/`);
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
