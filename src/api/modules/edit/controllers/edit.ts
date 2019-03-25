import DefaultObjectEditor from "../components/DefaultObjectEditor";
import DefaultArrayEditor from "../components/DefaultArrayEditor";
import DefaultStringEditor from "../components/DefaultStringEditor";
import DefaultNumberEditor from "../components/DefaultNumberEditor";
import DefaultBooleanEditor from "../components/DefaultBooleanEditor";

import EditController from "../models/EditController";
import Editor from "../models/Editor";
import Editors from "../models/Editors";

import readWriter, {ReadWriter} from "../../../util/ReadWriter";
import {SchemaType} from "../../../models/Schema";
import EditorProps from "../models/EditorProps";

import {ReactElement} from "react";

export default function editController(editors: Editors = {}): EditController {

  const editDefault: Editor<any> = (props: EditorProps<any>): ReactElement => {
    switch(props.schema.type) {
      case SchemaType.ARRAY:
        return DefaultArrayEditor(props);
      case SchemaType.BOOLEAN:
        return DefaultBooleanEditor(props);
      case SchemaType.NUMBER:
        return DefaultNumberEditor(props);
      case SchemaType.OBJECT:
        return DefaultObjectEditor(props);
      case SchemaType.STRING:
        return DefaultStringEditor(props);
      default:
        return null;
    }
  };

  const editorsReader = readWriter(editors);

  const edit: Editor<any> = (props: EditorProps<any>): ReactElement => {
    const propsReadWriter = readWriter(props);
    const customEditor = propsReadWriter.into('schema').into('editor').readAsOpt<string>();
    const useCustomEditor = !customEditor.isNone;
    const customEditorExists = !editorsReader
      .into(customEditor.value)
      .readAsOpt<Editor<any>>()
      .isNone;
    const path = propsReadWriter
      .into('path')
      .readAsOpt<ReadWriter>()
      .getOrElse(readWriter(props.value));
    const resolvedProps = readWriter(propsReadWriter
      .into('path')
      .write(path))
      .into('onEdit')
      .write(edit);

    if (useCustomEditor && customEditorExists) {
      return editors[customEditor.value](resolvedProps);
    } else {
      return editDefault(resolvedProps);
    }
  };

  function toFunction() {
    return edit;
  }

  function withEditor<T>(key: string, editor: Editor<T>): EditController {
    return editController(readWriter(editors).into(key).write(editor));
  }

  function withEditors(editors: Editors): EditController {
    return editController(editors);
  }

  return {
    toFunction,
    withEditor,
    withEditors
  };

};
