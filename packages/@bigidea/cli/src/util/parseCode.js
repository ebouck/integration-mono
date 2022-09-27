module.exports = function parseCode(url) {
  if (!url) {
    throw new Error("missing url");
  }

  const match = url.match(/^\/\?code=([a-zA-Z0-9\-]{32,36})$/);

  if (!match) {
    throw new Error("bad url");
  }

  return match[1];
};
