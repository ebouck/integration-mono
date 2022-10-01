import { ServerResponse } from "http";
import { program } from "commander";

export default function parseCode(
  url: string,
  baseUrl: string,
  res: ServerResponse
) {
  if (!url) {
    throw new Error("missing url");
  }

  const match = url.match(/^\/\?code=([a-zA-Z0-9\-]{32,36})$/);

  if (!match) {
    res.setHeader("location", `${baseUrl}/prototype/cli-login/failure`);
    res.end();
    program.error("Failed to find code in url");
  }

  return match[1];
}
