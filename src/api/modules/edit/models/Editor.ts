import Schema from "../../../models/Schema";

export default interface Editor<T, Component> {
  (value: T, schema: Schema): Component;
}

export interface Editors {
  [key: string]: Editor<any, any>;
}
