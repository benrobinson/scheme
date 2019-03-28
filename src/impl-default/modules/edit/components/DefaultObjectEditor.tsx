import * as React from 'react';
import {ReactElement} from 'react';
import namespaceClassName from '~/api/util/namespaceClassName';
import readWriter from '~/api/util/ReadWriter';
import EditorProps from '~/api/modules/edit/models/EditorProps';
import Editor from '~/api/modules/edit/models/Editor';
import Label from '~/impl-default/modules/edit/components/Label';
import FieldSet from "~impl-default/modules/edit/components/FieldSet";

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
  const label = readWriter(props.schema)
    .into('title')
    .readAsOpt<string>()
    .getOrElse('Object Editor');

  return (
    <div className={c('root')}>
      <FieldSet label={label}>
        {fields}
      </FieldSet>
    </div>
  );

};

export default DefaultObjectEditor;
