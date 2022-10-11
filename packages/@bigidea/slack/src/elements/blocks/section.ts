import { Block } from "./Block";
import { TextObj } from "../objects";

export interface SectionProps {
  /**
   * The text for the block, in the form of a text object. Maximum length for the text in this field is 3000 characters. This field is not required if a valid array of fields objects is provided instead.
   */
  text?: TextObj;
  /**
   * A string acting as a unique identifier for a block. If not specified, one will be generated. You can use this block_id when you receive an interaction payload to identify the source of the action. Maximum length for this field is 255 characters. block_id should be unique for each message and each iteration of a message. If a message is updated, use a new block_id.
   */
  blockId?: string;
  /**
   * Required if no text is provided. An array of text objects. Any text objects included with fields will be rendered in a compact format that allows for 2 columns of side-by-side text. Maximum number of items is 10. Maximum length for the text in each item is 2000 characters. Click here for an example.
   */
  fields?: TextObj[];
}

/**
 * A section is one of the most flexible blocks available - it can be used as a simple text block, in combination with text fields, or side-by-side with any of the available block elements.
 *
 * @group 2. Layout Block
 */
export class Section extends Block {
  text?: TextObj;
  fields?: TextObj[];

  constructor(propsOrStr: SectionProps | string) {
    if (typeof propsOrStr === "string") {
      const str = propsOrStr;

      super({ type: "section" });

      this.text = new TextObj(str);
    } else {
      const props = propsOrStr;

      super({ type: "section", blockId: props.blockId });

      this.text = props.text;
      this.fields = props.fields;
    }
  }

  output() {
    return {
      ...super.output(),
      text: this.text?.output(),
      fields: this.fields?.map((field) => field.output()),
    };
  }
}
