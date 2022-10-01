#!/usr/bin/env node
import { program } from "commander";
import * as dotenv from "dotenv";
import { create } from "./commands/create";
import { login } from "./commands/login";
import { dev } from "./commands/dev";
import { deploy } from "./commands/deploy";
import { run } from "./commands/run";
import { testing } from "./commands/testing";

dotenv.config();

program
  .description("Big Idea Integration CLI")
  .version("0.0.1")
  .addCommand(create)
  .addCommand(login)
  .addCommand(dev)
  .addCommand(deploy)
  .addCommand(run)
  .addCommand(testing);

async function main() {
  await program.parseAsync();
}
main();
