import { Command } from "commander";
import checkGhInstalled from "./checkGhInstalled";
import checkRepoNameAvailable from "./checkRepoNameAvailable";
import checkLocalDirectoryAvailable from "./checkLocalDirectoryAvailable";
import installPackages from "./installPackages";
import createAndCloneRepo from "./createAndCloneRepo";

export const create = new Command("create");

create
  .description("Create a new integration repo from template and clone it")
  .argument("<name>", "Name of project")
  .action(async (name) => {
    await checkGhInstalled();
    await checkRepoNameAvailable(name);
    await checkLocalDirectoryAvailable(name);
    await createAndCloneRepo(name);
    await installPackages(name);
  });
