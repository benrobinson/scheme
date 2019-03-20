import * as React from 'react';
import {FunctionComponent} from "react";
import namespaceClassName from '../../../util/namespaceClassName';

interface Props {
  label?: string;
  maximum: number;
  minimum: number;
  onChange: (value: number) => any,
  value: number;
}

const c = namespaceClassName('DefaultNumberEditor');

const DefaultNumberEditor: FunctionComponent<Props> = (props: Props) => {

  function renderLabel() {
    if (!!props.label) {
      return (
        <label className={c('label')}>{props.label}</label>
      );
    }

    return null;
  }

  function handleChange(e) {
    props.onChange(parseFloat(e.target.value))
  }

  return (
    <div className={c('root')}>
      {renderLabel()}
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
