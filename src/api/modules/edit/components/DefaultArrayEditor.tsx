import * as React from "react";
import {FunctionComponent, ReactElement} from "react";
import namespaceClassName from '../../../util/namespaceClassName';
import Label from "./Label";
import EditorProps from "../models/EditorProps";
import readWriter from "../../../util/ReadWriter";
import Schema from "../../../models/Schema";
import {generate} from "../../generate/controllers/generate";

export interface DefaultArrayItem {
  editor: ReactElement,
  value: any
}

const c = namespaceClassName('DefaultArrayEditor');

const DefaultArrayEditor: FunctionComponent<EditorProps<[]>> = (props: EditorProps<[]>) => {

  const schemaReader = readWriter(props.schema);
  const itemSchema = schemaReader
    .into('items')
    .readAsOpt<Schema>()
    .getOrElse({type: 'null'});
  const values: DefaultArrayItem[] = props.value.map((v, i) => ({
    editor: props.onEdit({
      value: v,
      schema: itemSchema,
      path: props.path.into(i),
      onUpdate: props.onUpdate
    }),
    value: v
  }));
  const blankItem = generate(itemSchema);
  const onAddItem = () => props.onUpdate(props.path.write([...props.value, blankItem]));
  const onRemoveItem = (item: any) => props.onUpdate(props.path.write(props.value.filter(v => v !== item)));

  function renderItem(item: DefaultArrayItem, i) {
    return (
      <li className={c('value')} key={i}>
        {item.editor}
        <button className={c('remove-button')} onClick={() => onRemoveItem(item.value)}>
          {'Remove'}
        </button>
      </li>
    );
  }

  return (
    <div className={c('root')}>
      <Label defaultLabel={'Array Editor'} schema={props.schema}/>
      <ul className={c('values')}>
        {values.map(renderItem)}
      </ul>
      <button
        className={c('add-button')}
        onClick={onAddItem}
      >
        {'Add'}
      </button>
    </div>
  );
};

export default DefaultArrayEditor;
