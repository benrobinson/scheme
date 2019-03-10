import Editor from "./Editor";
import Editors from "./Editors";

export default interface EditController {
  toFunction(): Editor<any>;
  withEditors(editors: Editors): EditController;
  withEditor<T>(key: string, editor: Editor<T>): EditController;
}

