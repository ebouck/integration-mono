import { program } from "commander";
import execa from "execa";

export default async function createAndCloneRepo(repo: string) {
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
    program.error("Error creating / cloning repo");
  }
}
