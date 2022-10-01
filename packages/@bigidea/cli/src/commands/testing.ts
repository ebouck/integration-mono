import { Command } from "commander";

export const testing = new Command("testing");

testing
  .command("print")
  .description("Longer desc")
  .action(() => {
    console.log("hi there");
  });
