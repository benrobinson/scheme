import Schema from "../../../models/Schema";
import EditorUI from "./EditorUI";

export default interface Editor<T> {
  (value: T, schema: Schema): EditorUI;
}

