export interface ObjProps {
  type: string;
}

/**
 * Composition objects can be used inside of block elements and certain message payload fields. They are simply common JSON object patterns that you'll encounter frequently when building blocks or composing messages.
 *
 * @group 3. Composition Object
 */
export abstract class Obj {
  type: string;

  protected constructor(props: ObjProps) {
    this.type = props.type;
  }

  output(): object {
    return { type: this.type };
  }
}
