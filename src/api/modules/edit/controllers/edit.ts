import {ReactElement} from 'react';

import readWriter, {ReadWriter} from '~/api/util/ReadWriter';
import Schema, {SchemaType} from '~/api/models/Schema';

import EditController from '~/api/modules/edit/models/EditController';
import Editor from '~/api/modules/edit/models/Editor';
import Editors from '~/api/modules/edit/models/Editors';
import EditorProps from '~/api/modules/edit/models/EditorProps';
import DefaultEditor from "~/api/modules/edit/models/DefaultEditor";

export default function editController(editors: Editors = {}): EditController {

  const defaultEditorName = (schema: Schema): string => {
    switch(schema.type) {
      case SchemaType.ARRAY:
        return DefaultEditor.ARRAY;
      case SchemaType.BOOLEAN:
        return DefaultEditor.BOOLEAN;
      case SchemaType.NUMBER:
        return DefaultEditor.NUMBER;
      case SchemaType.OBJECT:
        return DefaultEditor.OBJECT;
      case SchemaType.STRING:
        return DefaultEditor.STRING;
      default:
        return null;
    }
  };

  const editorsReader = readWriter(editors);

  const edit: Editor<any> = (props: EditorProps<any>): ReactElement => {
    const propsReadWriter = readWriter(props);

    const path = propsReadWriter
      .into('path')
      .readAsOpt<ReadWriter>()
      .getOrElse(readWriter(props.value));

    const resolvedProps = readWriter(propsReadWriter
      .into('path')
      .write(path))
      .into('onEdit')
      .write(edit);

    return editorsReader
      .into(propsReadWriter
        .into('schema')
        .into('editor')
        .readAsOpt<string>()
        .getOrElse(defaultEditorName(props.schema)))
      .readAsOpt<Editor<any>>()
      .map(editor => editor(resolvedProps))
      .getOrElse(null);
  };

  function toFunction(): Editor<any> {
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
