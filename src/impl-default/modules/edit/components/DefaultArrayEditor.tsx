import * as React from 'react';
import {ReactElement} from 'react';
import Schema from '~/api/models/Schema';
import namespaceClassName from '~/api/util/namespaceClassName';
import readWriter from '~/api/util/ReadWriter';
import EditorProps from '~/api/modules/edit/models/EditorProps';
import Editor from '~/api/modules/edit/models/Editor';
import {generate} from '~/api/modules/generate/controllers/generate';
import Label from '~/impl-default/modules/edit/components/Label';

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
  const onRemoveItem = (item: any) => onUpdate(path.write(value.filter(v => v !== item)));

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
      <Label defaultLabel={'Array Editor'} schema={schema}/>
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
