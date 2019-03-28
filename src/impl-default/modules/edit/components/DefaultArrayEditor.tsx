import * as React from 'react';
import {ReactElement, useState} from 'react';
import Schema from '~/api/models/Schema';
import namespaceClassName from '~/api/util/namespaceClassName';
import readWriter from '~/api/util/ReadWriter';
import EditorProps from '~/api/modules/edit/models/EditorProps';
import Editor from '~/api/modules/edit/models/Editor';
import {generate} from '~/api/modules/generate/controllers/generate';
import Label from '~/impl-default/modules/edit/components/Label';
import Button, {ButtonStyle} from "~impl-default/modules/edit/components/Button";

export interface DefaultArrayItem {
  editor: ReactElement,
  value: any
}

const c = namespaceClassName('DefaultArrayEditor');

const DefaultArrayEditor: Editor<[]> = (props: EditorProps<[]>) => {

  const {schema, path, onEdit, onUpdate, value} = props;
  const schemaReader = readWriter(schema);
  const itemSchema = schemaReader
    .into('items')
    .readAsOpt<Schema>()
    .getOrElse({type: 'null'});
  const values: DefaultArrayItem[] = props.value.map((v, i) => ({
    editor: onEdit({
      value: v,
      schema: itemSchema,
      path: path.into(i),
      onUpdate: onUpdate
    }),
    value: v
  }));
  const blankItem = generate(itemSchema);
  const onAddItem = () => onUpdate(path.write([...value, blankItem]));
  const onRemoveItem = (ii: number) => onUpdate(path.write(value.filter((_, i) => i !== ii)));

  function renderItem(item: DefaultArrayItem, i) {
    return (
      <li className={c('value')} key={i}>
        {item.editor}
        <div className={c('remove-button')}>
          <Button
            label={'Remove Item'}
            onClick={() => onRemoveItem(i)}
            style={ButtonStyle.NEGATIVE}
          />
        </div>
      </li>
    );
  }

  return (
    <div className={c('root')}>
      <Label defaultLabel={'Array Editor'} schema={schema}/>
      <ul className={c('values')}>
        {values.map(renderItem)}
      </ul>
      <div className={c('add-button')}>
        <Button
          label={'Add Item'}
          onClick={onAddItem}
          style={ButtonStyle.POSITIVE}
        />
      </div>
    </div>
  );
};

export default DefaultArrayEditor;
