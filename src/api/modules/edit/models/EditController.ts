import Editor from "./Editor";
import Editors from "./Editors";
import Schema from "../../../models/Schema";
import EditorComponent from "./EditorComponent";

export default interface EditController {
  toFunction(): (value: any, schema: Schema) => EditorComponent;
  withEditors(editors: Editors): EditController;
  withEditor<T>(key: string, editor: Editor<T>): EditController;
}

