import * as React from 'react';
import {FunctionComponent, ReactElement} from "react";
import namespaceClassName from '../../../util/namespaceClassName';
import EditorProps from "../models/EditorProps";
import Label from "./Label";
import readWriter from "../../../util/ReadWriter";

const c = namespaceClassName('DefaultObjectEditor');

const DefaultObjectEditor: FunctionComponent<EditorProps<object>> = (props: EditorProps<object>) => {

  const schemaReader = readWriter(props.schema);
  const schemaProps = schemaReader
    .into('properties')
    .readAsOpt<{}>()
    .getOrElse({});
  const fields = Object
    .keys(schemaProps)
    .map(prop => props.onEdit({
      value: props.value[prop],
      schema: schemaProps[prop],
      path: props.path.into(prop),
      onUpdate: props.onUpdate
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
        <Label defaultLabel={'Object Editor'} schema={props.schema} />
        {Object.keys(fields).map((k, i) => renderField(fields[k], i))}
      </fieldset>
    </div>
  );

};

export default DefaultObjectEditor;
