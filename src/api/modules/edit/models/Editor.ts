import Schema from "../../../models/Schema";
import {ReadWriter} from "../../../util/ReadWriter";
import OnUpdate from "./OnUpdate";
import {ReactElement} from "react";

export default interface Editor<T> {
  (value: T, schema: Schema, path: ReadWriter, onUpdate: OnUpdate): ReactElement;
}

