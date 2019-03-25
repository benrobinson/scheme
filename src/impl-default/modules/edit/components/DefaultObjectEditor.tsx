import * as React from 'react';
import {ReactElement} from 'react';
import namespaceClassName from '~/api/util/namespaceClassName';
import readWriter from '~/api/util/ReadWriter';
import EditorProps from '~/api/modules/edit/models/EditorProps';
import Editor from '~/api/modules/edit/models/Editor';
import Label from '~/impl-default/modules/edit/components/Label';

const c = namespaceClassName('DefaultObjectEditor');

const DefaultObjectEditor: Editor<object> = (props: EditorProps<object>) => {

  const {onEdit, onUpdate, path, schema, value} = props;

  const schemaReader = readWriter(schema);
  const schemaProps = schemaReader
    .into('properties')
    .readAsOpt<object>()
    .getOrElse({});
  const fields = Object
    .keys(schemaProps)
    .map(prop => onEdit({
      value: value[prop],
      schema: schemaProps[prop],
      path: path.into(prop),
      onUpdate: onUpdate
    }));

  function renderField(field: ReactElement, i) {
    return (
      <div className={c('field')} key={i}>
        {field}
      </div>
    );
  }

  return (
    <div className={c('root')}>
      <fieldset className={c('fields')}>
        <Label defaultLabel={'Object Editor'} schema={schema} />
        {Object.keys(fields).map((k, i) => renderField(fields[k], i))}
      </fieldset>
    </div>
  );

};

export default DefaultObjectEditor;
