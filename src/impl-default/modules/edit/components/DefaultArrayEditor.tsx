import * as React from 'react';
import {ReactElement, Reducer, useState} from 'react';
import Schema from '~/api/models/Schema';
import namespaceClassName from '~/api/util/namespaceClassName';
import readWriter from '~/api/util/ReadWriter';
import EditorProps from '~/api/modules/edit/models/EditorProps';
import Editor from '~/api/modules/edit/models/Editor';
import {generate} from '~/api/modules/generate/controllers/generate';
import Label from '~/impl-default/modules/edit/components/Label';
import Button, {ButtonStyle} from "~impl-default/modules/edit/components/Button";
import FieldSet from "~impl-default/modules/edit/components/FieldSet";

export interface DefaultArrayItem {
  editor: ReactElement,
  value: any
}

const c = namespaceClassName('DefaultArrayEditor');

function generateRenderKey() {
  return (Math.random() * new Date().getTime()) + '';
}

let renderKey = generateRenderKey();

const DefaultArrayEditor: Editor<[]> = (props: EditorProps<[]>) => {

  const {schema, path, onEdit, onUpdate, value} = props;
  const schemaReader = readWriter(schema);
  const itemSchema = schemaReader
    .into('items')
    .readAsOpt<Schema>()
    .getOrElse({type: 'null'});
  const label = readWriter(props.schema)
    .into('title')
    .readAsOpt<string>()
    .getOrElse('Array Editor');
  const values: ReactElement[] = props.value.map((v, i) => onEdit({
    value: v,
    schema: itemSchema,
    path: path.into(i),
    onUpdate: onUpdate
  }));
  const blankItem = generate(itemSchema);
  const onAddSubEditor = () => onUpdate(path.write([...value, blankItem]));
  const onRemoveSubEditor = (ii: number) => {
    renderKey = generateRenderKey();
    onUpdate(path.write(value.filter((_, i) => i !== ii)));
  };

  function renderSubEditor(editor, i) {
    return (
      <div className={c('item')} key={i + renderKey}>
        <div className={c('item-editor')}>
          {editor}
        </div>
        <div className={c('remove-button')}>
          <Button
            label={'Remove Item'}
            onClick={() => onRemoveSubEditor(i)}
            style={ButtonStyle.NEGATIVE}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={c('root')}>
      <FieldSet label={label}>
        {values.map(renderSubEditor)}
        <div className={c('add-button')} key={'add-button'}>
          <Button
            label={'Add Item'}
            onClick={onAddSubEditor}
            style={ButtonStyle.POSITIVE}
          />
        </div>
      </FieldSet>
    </div>
  );
};

export default DefaultArrayEditor;
