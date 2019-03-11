import {FunctionComponent} from 'react';
import EditorProps from "./EditorProps";

export default interface EditorComponent extends FunctionComponent<EditorProps> {
  (props: EditorProps): any;
}
