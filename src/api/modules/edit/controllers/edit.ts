import DefaultObjectEditor from "../components/DefaultObjectEditor";
import DefaultArrayEditor from "../components/DefaultArrayEditor";
import DefaultStringEditor from "../components/DefaultStringEditor";
import DefaultNumberEditor from "../components/DefaultNumberEditor";
import DefaultBooleanEditor from "../components/DefaultBooleanEditor";

import EditController from "../models/EditController";
import Editor from "../models/Editor";
import Editors from "../models/Editors";
import EditorUI from "../models/EditorUI";

import ReadWriter from "../../../util/ReadWriter";
import Schema, {SchemaType} from "../../../models/Schema";

export default function editController(editors: Editors = {}): EditController {

  const editArrayDefault: Editor<[]> = (value: [], schema: Schema): EditorUI => {
    const schemaReader = ReadWriter(schema);
    const values = value.map(v => edit(v, schemaReader.into('items').readAsOpt<Schema>().getOrElse({type: 'string'})));

    return DefaultArrayEditor({
      label: schemaReader.into('title').readAsOpt<string>().getOrElse('Array Editor'),
      values
    });
  };

  const editBooleanDefault: Editor<boolean> = (value: boolean, schema): EditorUI => {
    const schemaReader = ReadWriter(schema);

    return DefaultBooleanEditor({
      label: schemaReader.into('title').readAsOpt<string>().getOrElse('Boolean Editor'),
      value
    });
  };

  const editNumberDefault: Editor<number> = (value: number, schema: Schema): EditorUI => {
    const schemaReader = ReadWriter(schema);

    return DefaultNumberEditor({
      label: schemaReader.into('title').readAsOpt<string>().getOrElse('Number Editor'),
      minimum: schemaReader.into('minimum').readAsOpt<number>().getOrElse(Number.MIN_VALUE),
      maximum: schemaReader.into('maximum').readAsOpt<number>().getOrElse(Number.MAX_VALUE),
      value
    });
  };

  const editObjectDefault: Editor<any> = (value: {}, schema: Schema): EditorUI => {
    const schemaReader = ReadWriter(schema);
    const schemaProps = schemaReader.into('properties').readAsOpt<{}>().getOrElse({});
    const fields = Object.keys(schemaProps).map(prop => {
      return edit(value[prop], schemaProps[prop]);
    });

    return DefaultObjectEditor({
      label: schemaReader.into('title').readAsOpt<string>().getOrElse('Object Editor'),
      fields
    });
  };

  const editStringDefault: Editor<string> = (value: string, schema: Schema): EditorUI => {
    const schemaReader = ReadWriter(schema);

    return DefaultStringEditor({
      label: schemaReader.into('title').readAsOpt<string>().getOrElse('Text Editor'),
      value
    });
  };

  const editDefault: Editor<any> = (value: any, schema: Schema): EditorUI => {
    switch(schema.type) {
      case SchemaType.ARRAY:
        return editArrayDefault(value, schema);
      case SchemaType.BOOLEAN:
        return editBooleanDefault(value, schema);
      case SchemaType.NUMBER:
        return editNumberDefault(value, schema);
      case SchemaType.OBJECT:
        return editObjectDefault(value, schema);
      case SchemaType.STRING:
        return editStringDefault(value, schema);
      default:
        return;
    }
  };

  const editorsReader = ReadWriter(editors);

  const edit: Editor<any> = (value: any, schema: Schema): EditorUI => {
    const editor = ReadWriter(schema).into('editor').readAsOpt<string>();

    if (!editor.isNone && !editorsReader.into(editor.value).readAsOpt<Editor<any>>().isNone) {
      return editors[editor.value](value, schema);
    } else {
      return editDefault(value, schema);
    }
  };

  function toFunction(): Editor<any> {
    return edit;
  }

  function withEditor(key: string, editor: Editor): EditController {
    return editController(ReadWriter(editors).into(key).write(editor).read());
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

