import Editor from "./Editor";
import Editors from "./Editors";
import Schema from "../../../models/Schema";
import {ReactElement} from "react";

export default interface EditController {
  toFunction(): (value: any, schema: Schema) => ReactElement;
  withEditors(editors: Editors): EditController;
  withEditor<T>(key: string, editor: Editor<T>): EditController;
}

