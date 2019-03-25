import * as React from 'react';
import namespaceClassName from '../../../util/namespaceClassName';
import Editor from "../models/Editor";
import EditorProps from "../models/EditorProps";
import Label from "./Label";

const c  = namespaceClassName('DefaultBooleanEditor');

const DefaultBooleanEditor: Editor<boolean> = (props: EditorProps<boolean>) => {

  function handleChange(e) {
    props.onUpdate(props.path.write(!props.value))
  }

  return (
    <div className={c('root')}>
      <Label defaultLabel={'Boolean Editor'} schema={props.schema} />
      <input
        className={c('value')}
        type={'checkbox'}
        checked={props.value}
        onChange={handleChange}
      />
    </div>
  );
};

export default DefaultBooleanEditor;
