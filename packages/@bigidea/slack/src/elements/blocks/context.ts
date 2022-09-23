import { SlackObject } from "../objects";

export interface ContextOptions {
  /**
   * An array of image elements and text objects. Maximum number of items is 10.
   */
  elements: SlackObject[];
  /**
   * A string acting as a unique identifier for a block. If not specified, one will be generated. Maximum length for this field is 255 characters. block_id should be unique for each message and each iteration of a message. If a message is updated, use a new block_id.
   */
  blockId?: string;
}

export interface Context extends ContextOptions {
  type: "context";
}

export default function context(options: ContextOptions) {
  const { elements, blockId } = options;

  return {
    type: "context",
    elements,
    blockId,
  };
}
