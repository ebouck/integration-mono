interface BlockProps {
  type: string;
  blockId?: string;
}

/**
 * Blocks are a series of components that can be combined to create visually rich and compellingly interactive messages.
 *
 * @group 2. Layout Block
 */
export abstract class Block {
  type: string;
  blockId?: string;

  protected constructor(props: BlockProps) {
    this.type = props.type;
    this.blockId = props.blockId;
  }

  output(): object {
    return { type: this.type, blockId: this.blockId };
  }
}
