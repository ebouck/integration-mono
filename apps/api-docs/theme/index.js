const { MarkdownTheme } = require("typedoc-plugin-markdown");

class OurMarkdownTheme extends MarkdownTheme {
  render(page) {
    this.application.logger.info(`XXX Rendering ${page.url}`);
    return super.render(page);
  }
}

function load(app) {
  app.renderer.defineTheme("our-markdown", OurMarkdownTheme);
}

module.exports = {
  load,
  OurMarkdownTheme,
};
