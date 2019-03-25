import OnUpdate from "./OnUpdate";
import Schema from "../../../models/Schema";
import {ReadWriter} from "../../../util/ReadWriter";
import {ReactElement} from "react";

export default interface EditorProps<T> {
  value: T;
  schema: Schema;
  onEdit?(props: EditorProps<any>): ReactElement;
  onUpdate: OnUpdate;
  path?: ReadWriter;
}
