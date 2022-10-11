import { Block } from "./Block";
import { TextObj } from "../objects";

export interface HeaderProps {
  text: TextObj;
  blockId?: string;
}

/**
 * A header is a plain-text block that displays in a larger, bold font. Use it to delineate between different groups of content in your app's surfaces.
 *
 * @group 2. Layout Block
 *
 * @example Compact
 * ```typescript
 * new Header("The Header");
 * ```
 *
 * @example A little more detail
 * ```typescript
 * new Header({
 *   text: new PlainText("The Header"),
 * }),
 * ```
 */
export class Header extends Block {
  text: TextObj;

  /**
   * @param propsOrStr Either specify HeaderProps or use a string as short-hand for creating a plain_text TextObj
   */
  constructor(propsOrStr: HeaderProps | string) {
    if (typeof propsOrStr === "string") {
      const str = propsOrStr;

      super({ type: "header" });

      this.text = new TextObj({ type: "plain_text", text: str });
    } else {
      const props = propsOrStr;
      super({ type: "header", blockId: props.blockId });
      this.text = props.text;
    }
  }

  output() {
    return { ...super.output(), text: this.text.output() };
  }
}
