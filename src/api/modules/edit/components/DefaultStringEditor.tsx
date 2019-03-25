import * as React from 'react';
import namespaceClassName from '../../../util/namespaceClassName';
import EditorProps from "../models/EditorProps";
import Editor from "../models/Editor";
import Label from "./Label";

const c = namespaceClassName('DefaultNumberEditor');

const DefaultStringEditor: Editor<string> = (props: EditorProps<string>) => {

  function handleChange(e) {
    props.onUpdate(props.path.write(e.target.value))
  }

  return (
    <div className={c('root')}>
      <Label defaultLabel={'Text Editor'} schema={props.schema} />
      <input
        className={c('value')}
        type={'text'}
        value={props.value}
        onChange={handleChange}
      />
    </div>
  );
};

export default DefaultStringEditor;
