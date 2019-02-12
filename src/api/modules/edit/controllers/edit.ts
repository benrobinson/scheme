import {readNullable} from "../../../util/readNullable";
import Editor, {Editors} from "../models/Editor";
import Schema, {SchemaType} from "../../../models/Schema";
import DefaultObjectEditor from "../components/DefaultObjectEditor";
import DefaultArrayEditor from "../components/DefaultArrayEditor";
import DefaultStringEditor from "../components/DefaultStringEditor";
import DefaultNumberEditor from "../components/DefaultNumberEditor";
import DefaultBooleanEditor from "../components/DefaultBooleanEditor";
import {LazyComponent} from "../../../util/lazyComponent";

interface EditController {
  edit: Editor<any, LazyComponent>;
  withEditor: (name: string, editor: Editor<any, LazyComponent>) => EditController;
  withEditors: (editors: Editors) => EditController;
}

export default function editFromConfig(editors: Editors = {}): EditController {

  const editArrayDefault: Editor<[], LazyComponent> = (value: [], schema: Schema): LazyComponent => {
    const schemaReader = readNullable(schema);
    const values = value.map(v => edit(v, schemaReader.into('items').getOrElse({type: 'string'})));

    return DefaultArrayEditor({
      label: schemaReader.into('title').getOrElse('Array Editor'),
      values
    });
  };

  const editBooleanDefault: Editor<boolean, LazyComponent> = (value: boolean, schema): LazyComponent => {
    const schemaReader = readNullable(schema);

    return DefaultBooleanEditor({
      label: schemaReader.into('title').getOrElse('Boolean Editor'),
      value
    });
  };

  const editNumberDefault: Editor<number, LazyComponent> = (value: number, schema: Schema): LazyComponent => {
    const schemaReader = readNullable(schema);

    return DefaultNumberEditor({
      label: schemaReader.into('title').getOrElse('Number Editor'),
      minimum: schemaReader.into('minimum').getOrElse(Number.MIN_VALUE),
      maximum: schemaReader.into('maximum').getOrElse(Number.MAX_VALUE),
      value
    });
  };

  const editObjectDefault: Editor<{}, LazyComponent> = (value: {}, schema: Schema): LazyComponent => {
    const schemaReader = readNullable(schema);
    const schemaProps = schemaReader.into('properties').getOrElse({});
    const fields = Object.keys(schemaProps).map(prop => {
      return edit(value[prop], schemaProps[prop]);
    });

    return DefaultObjectEditor({
      label: schemaReader.into('title').getOrElse('Object Editor'),
      fields
    });
  };

  const editStringDefault: Editor<string, LazyComponent> = (value: string, schema: Schema): LazyComponent => {
    const schemaReader = readNullable(schema);

    return DefaultStringEditor({
      label: schemaReader.into('title').getOrElse('Text Editor'),
      value
    });
  };

  const editDefault: Editor<any, LazyComponent> = (value: any, schema: Schema): LazyComponent => {
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

  const editorsReader = readNullable<Editor<any, LazyComponent>>(editors);


  /**
   * edit
   *
   * @public
   * @param value
   * @param schema
   */
  const edit: Editor<any, LazyComponent> = (value: any, schema: Schema) => {
    const editor = readNullable(schema).into('editor').asOpt<string>();

    if (!editor.isNone && !editorsReader.into(editor.value).asOpt().isNone) {
      return editors[editor.value](value, schema);
    } else {
      return editDefault(value, schema);
    }
  };

  /**
   * withEditor
   *
   * @public
   * @param {string} name
   * @param {Editor} editor
   */
  function withEditor(name: string, editor: Editor<any, LazyComponent>): EditController {
    return editFromConfig({...editors, [name]: editor});
  }

  /**
   * withEditors
   *
   * @public
   * @param {Editors} editors
   */
  function withEditors(editors: Editors): EditController {
    return editFromConfig(editors);
  }

  return {
    edit,
    withEditor,
    withEditors
  };

};
