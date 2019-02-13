import {readNullable} from "../../../util/readNullable";
import Editor, {Editors} from "../models/Editor";
import Schema, {SchemaType} from "../../../models/Schema";
import DefaultObjectEditor from "../components/DefaultObjectEditor";
import DefaultArrayEditor from "../components/DefaultArrayEditor";
import DefaultStringEditor from "../components/DefaultStringEditor";
import DefaultNumberEditor from "../components/DefaultNumberEditor";
import DefaultBooleanEditor from "../components/DefaultBooleanEditor";
import {LazyComponent, FunctionComponent} from "../../../util/lazyComponent";

export interface EditController<Component extends FunctionComponent> {
  edit: Editor<any, LazyComponent<Component>>;
  withEditor: (name: string, editor: Editor<any, LazyComponent<Component>>) => EditController<Component>;
  withEditors: (editors: Editors) => EditController<Component>;
}

export default function editFromConfig<Component extends FunctionComponent>(editors: Editors = {}): EditController<Component> {

  const editArrayDefault: Editor<[], LazyComponent<Component>> = (value: [], schema: Schema): LazyComponent<Component> => {
    const schemaReader = readNullable(schema);
    const values = value.map(v => edit(v, schemaReader.into('items').getOrElse({type: 'string'})));

    return DefaultArrayEditor({
      label: schemaReader.into('title').getOrElse('Array Editor'),
      values
    });
  };

  const editBooleanDefault: Editor<boolean, LazyComponent<Component>> = (value: boolean, schema): LazyComponent<Component> => {
    const schemaReader = readNullable(schema);

    return DefaultBooleanEditor({
      label: schemaReader.into('title').getOrElse('Boolean Editor'),
      value
    });
  };

  const editNumberDefault: Editor<number, LazyComponent<Component>> = (value: number, schema: Schema): LazyComponent<Component> => {
    const schemaReader = readNullable(schema);

    return DefaultNumberEditor({
      label: schemaReader.into('title').getOrElse('Number Editor'),
      minimum: schemaReader.into('minimum').getOrElse(Number.MIN_VALUE),
      maximum: schemaReader.into('maximum').getOrElse(Number.MAX_VALUE),
      value
    });
  };

  const editObjectDefault: Editor<any, LazyComponent<Component>> = (value: {}, schema: Schema): LazyComponent<Component> => {
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

  const editStringDefault: Editor<string, LazyComponent<Component>> = (value: string, schema: Schema): LazyComponent<Component> => {
    const schemaReader = readNullable(schema);

    return DefaultStringEditor({
      label: schemaReader.into('title').getOrElse('Text Editor'),
      value
    });
  };

  const editDefault: Editor<any, LazyComponent<Component>> = (value: any, schema: Schema): LazyComponent<Component> => {
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

  const editorsReader = readNullable<Editor<any, LazyComponent<Component>>>(editors);


  /**
   * edit
   *
   * @public
   * @param value
   * @param schema
   */
  const edit: Editor<any, LazyComponent<Component>> = (value: any, schema: Schema): LazyComponent<Component> => {
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
  function withEditor(name: string, editor: Editor<any, LazyComponent<Component>>): EditController<Component> {
    return editFromConfig({...editors, [name]: editor});
  }

  /**
   * withEditors
   *
   * @public
   * @param {Editors} es
   */
  function withEditors(es: Editors): EditController<Component> {
    return editFromConfig({...editors, ...es});
  }

  return {
    edit,
    withEditor,
    withEditors
  };

};
