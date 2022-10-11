import { TextObj } from "./Obj";

export interface TextObjProps {
  /**
   * The formatting to use for this text object. Can be one of plain_text or mrkdwn.
   */
  type: "plain_text" | "mrkdwn";
  /**
   * The text for the block. This field accepts any of the standard text formatting markup when type is mrkdwn. The maximum length is 3000 characters.
   */
  text: string;
  /**
   * Indicates whether emojis in a text field should be escaped into the colon emoji format. This field is only usable when type is plain_text.
   */
  emoji?: boolean;
  /**
   * When set to false (as is default) URLs will be auto-converted into links, conversation names will be link-ified, and certain mentions will be automatically parsed.
   Using a value of true will skip any preprocessing of this nature, although you can still include manual parsing strings. This field is only usable when type is mrkdwn.
   */
  verbatim?: boolean;
}

/**
 * An object containing some text, formatted either as plain_text or using mrkdwn, our proprietary contribution to the much beloved Markdown standard.
 *
 * @group 3. Composition Object
 */
export class TextObj extends TextObj {
  text: string;
  emoji?: boolean;
  verbatim?: boolean;

  constructor(propsOrStr: TextObjProps | string) {
    if (typeof propsOrStr === "string") {
      const str = propsOrStr;

      super({ type: "mrkdwn" });

      this.text = str;
      this.emoji = false;
      this.verbatim = false;
    } else {
      const props = propsOrStr;

      super({ type: "mrkdwn" });

      this.text = props.text;
      this.emoji = props.emoji;
      this.verbatim = props.verbatim;
    }
  }

  output() {
    return {
      ...super.output(),
      text: this.text,
      emoji: this.emoji,
      verbatim: this.verbatim,
    };
  }
}
