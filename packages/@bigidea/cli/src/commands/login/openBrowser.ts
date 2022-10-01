import open from "open";

export default async function openBrowser(baseUrl: string, localPort: number) {
  console.log("Opening your browser to allow you to login");

  await open(`${baseUrl}/prototype/cli-login/${localPort}/`);
}
