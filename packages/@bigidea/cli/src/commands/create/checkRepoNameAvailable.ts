import execa from "execa";
import { program } from "commander";

export default async function checkRepoNameAvailable(repo: string) {
  let found: boolean = false;

  try {
    await execa("gh", ["repo", "view", repo]);
    found = true;
  } catch (error) {
    // continue
  }

  if (found) {
    program.error(
      `Repo ${repo} already exists. Delete or choose another name to continue.`
    );
  }
}
