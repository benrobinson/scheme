import Schema from "../../../models/Schema";

export default interface Generator<T> {
  (schema: Schema): T;
}
