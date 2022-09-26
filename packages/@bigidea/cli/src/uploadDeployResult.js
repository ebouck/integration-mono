const fetch = require("node-fetch");

module.exports = async function uploadDeployResult(
  program,
  { status, logs, compiledCode }
) {
  const baseUrl = process.env.BASE_URL;
  const envName = process.env.ENV_NAME;
  const apiKey = process.env.API_KEY;

  const response = await fetch(`${baseUrl}/api/v1/envs/${envName}/deploys`, {
    method: "POST",
    headers: {
      Authorization: `apiKey ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status,
      logs,
      compiledCode: compiledCode.toString("utf-8"),
    }),
  });

  if (response.ok) {
    console.log("Uploaded deploy result");
  } else {
    console.log("Failed to upload deploy result");
  }
};
