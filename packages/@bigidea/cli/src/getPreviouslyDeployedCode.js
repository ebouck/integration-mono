const fetch = require("node-fetch");

module.exports = async function getPreviouslyDeployedCode(program) {
  const baseUrl = process.env.BASE_URL;
  const envName = process.env.ENV_NAME;
  const apiKey = process.env.API_KEY;

  const response = await fetch(
    `${baseUrl}/api/v1/envs/${envName}/deploys/previous-code`,
    {
      method: "GET",
      headers: {
        Authorization: `apiKey ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    console.log("Retrieved previous deploy");
    const data = await response.json();
    const { compiledCode } = data;
    return compiledCode;
  } else {
    console.log("Previous deploy not found");
    return null;
  }
};
