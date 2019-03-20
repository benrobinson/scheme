import DefaultObjectEditor from "../components/DefaultObjectEditor";
import DefaultArrayEditor from "../components/DefaultArrayEditor";
import DefaultStringEditor from "../components/DefaultStringEditor";
import DefaultNumberEditor from "../components/DefaultNumberEditor";
import DefaultBooleanEditor from "../components/DefaultBooleanEditor";

import EditController from "../models/EditController";
import Editor from "../models/Editor";
import Editors from "../models/Editors";
import EditorComponent from "../models/EditorComponent";

import readWriter, {ReadWriter} from "../../../util/ReadWriter";
import Schema, {SchemaType} from "../../../models/Schema";
import OnUpdate from "../models/OnUpdate";
import EditorProps from "../models/EditorProps";

import {ReactElement} from "react";
import {generate} from "../../generate/controllers/generate";

export interface DefaultArrayItem {
  editor: ReactElement,
  value: any
}

export default function editController(editors: Editors = {}): EditController {

  const editArrayDefault: Editor<[]> = (value: [], schema: Schema, path: ReadWriter, onUpdate: OnUpdate): ReactElement => {
    const schemaReader = readWriter(schema);
    const itemSchemas = schemaReader
      .into('items')
      .readAsOpt()
      .getOrElse(schemaReader
        .into('items')
        .into('anyOf')
        .readAsOpt<any[]>()
        .getOrElse([]));

    const values: DefaultArrayItem[] = value.map((v, i) => {
      return {
        editor: edit(v, itemSchema, path.into(i), onUpdate),
        value: v
      }
    });
    const blankItem = generate(itemSchema);
    const onAddItem = () => onUpdate(path.write([...value, blankItem]));
    const onRemoveItem = (item: any) => onUpdate(path.write(value.filter(v => v !== item)));

    return DefaultArrayEditor({
      label: schemaReader.into('title').readAsOpt<string>().getOrElse('Array Editor'),
      onAddItem,
      onRemoveItem,
      values
    });
  };

  const editBooleanDefault: Editor<boolean> = (value: boolean, schema: Schema, path: ReadWriter, onUpdate: OnUpdate): ReactElement => {
    const schemaReader = readWriter(schema);

    return DefaultBooleanEditor({
      label: schemaReader.into('title').readAsOpt<string>().getOrElse('Boolean Editor'),
      onChange: (value: boolean) => onUpdate(path.write(value)),
      value: readWriter(value).readAsOpt<boolean>().getOrElse(false)
    });
  };

  const editNumberDefault: Editor<number> = (value: number, schema: Schema, path: ReadWriter, onUpdate: OnUpdate): ReactElement => {
    const schemaReader = readWriter(schema);

    return DefaultNumberEditor({
      label: schemaReader.into('title').readAsOpt<string>().getOrElse('Number Editor'),
      minimum: schemaReader.into('minimum').readAsOpt<number>().getOrElse(Number.MIN_VALUE),
      maximum: schemaReader.into('maximum').readAsOpt<number>().getOrElse(Number.MAX_VALUE),
      onChange: (value: number) => onUpdate(path.write(value)),
      value: readWriter(value).readAsOpt<number>().getOrElse(0)
    });
  };

  const editObjectDefault: Editor<any> = (value: {}, schema: Schema, path: ReadWriter, onUpdate: OnUpdate): ReactElement => {
    const schemaReader = readWriter(schema);
    const schemaProps = schemaReader.into('properties').readAsOpt<{}>().getOrElse({});
    const fields = Object.keys(schemaProps).map(prop =>
      edit(value[prop], schemaProps[prop], path.into(prop), onUpdate));

    return DefaultObjectEditor({
      label: schemaReader.into('title').readAsOpt<string>().getOrElse('Object Editor'),
      fields
    });
  };

  const editStringDefault: Editor<string> = (value: string, schema: Schema, path: ReadWriter, onUpdate: OnUpdate): ReactElement => {
    const schemaReader = readWriter(schema);

    return DefaultStringEditor({
      label: schemaReader.into('title').readAsOpt<string>().getOrElse('Text Editor'),
      onChange: (value: string) => onUpdate(path.write(value)),
      value: readWriter(value).readAsOpt<string>().getOrElse('')
    });
  };

  const editDefault: Editor<any> = (value: any, schema: Schema, path: ReadWriter, onUpdate: OnUpdate): ReactElement => {
    switch(schema.type) {
      case SchemaType.ARRAY:
        return editArrayDefault(value, schema, path, onUpdate);
      case SchemaType.BOOLEAN:
        return editBooleanDefault(value, schema, path, onUpdate);
      case SchemaType.NUMBER:
        return editNumberDefault(value, schema, path, onUpdate);
      case SchemaType.OBJECT:
        return editObjectDefault(value, schema, path, onUpdate);
      case SchemaType.STRING:
        return editStringDefault(value, schema, path, onUpdate);
      default:
        return null;
    }
  };

  const editorsReader = readWriter(editors);

  const edit: Editor<any> = (value: any, schema: Schema, path: ReadWriter, onUpdate: OnUpdate): ReactElement => {
    const editor = readWriter(schema).into('editor').readAsOpt<string>();

    if (!editor.isNone && !editorsReader.into(editor.value).readAsOpt<Editor<any>>().isNone) {
      return editors[editor.value](value, schema, path, onUpdate);
    } else {
      return editDefault(value, schema, path, onUpdate);
    }
  };

  function toFunction() {
    return (value: any, schema: Schema): EditorComponent => {
      return (props: EditorProps): ReactElement => {
        const v = readWriter(props).into('value').readAsOpt().isNone
          ? value
          : props.value;
        const path = readWriter(v);
        return edit(v, schema, path, props.onUpdate);
      };
    }
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
