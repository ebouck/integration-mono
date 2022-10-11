import { Block } from "./Block";

export interface DividerProps {
  blockId?: string;
}

/**
 * A content divider, like an hr, to split up different blocks inside of a message. The divider block is nice and neat, requiring only a type.
 *
 * @group 2. Layout Block
 *
 * @example No properties required
 * ```typescript
 * new Divider();
 * ```
 *
 * @example Specify a blockId
 * ```typescript
 * new Divider({ blockId: "my-block-id" });
 * ```
 *
 */
export class Divider extends Block {
  constructor(props?: DividerProps) {
    super({ type: "divider", blockId: props?.blockId });
  }
}
