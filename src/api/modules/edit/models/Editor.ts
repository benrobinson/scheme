import {ReactElement} from "react";
import EditorProps from "./EditorProps";

export default interface Editor<T> {
  (props: EditorProps<T>): ReactElement;
}

