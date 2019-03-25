import * as React from 'react';
import namespaceClassName from '../../../util/namespaceClassName';
import Editor from "../models/Editor";
import EditorProps from "../models/EditorProps";
import Label from "./Label";

const c = namespaceClassName('DefaultNumberEditor');

const DefaultNumberEditor: Editor<number> = (props: EditorProps<number>) => {

  function handleChange(e) {
    props.onUpdate(props.path.write(parseFloat(e.target.value)))
  }

  return (
    <div className={c('root')}>
      <Label defaultLabel={'Number Editor'} schema={props.schema} />
      <input
        className={c('value')}
        type={'number'}
        defaultValue={props.value.toString()}
        onChange={handleChange}
      />
    </div>
  );
};

export default DefaultNumberEditor;
