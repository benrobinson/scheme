import * as React from 'react';
import {FunctionComponent} from "react";
import namespaceClassName from '../../../util/namespaceClassName';

interface Props {
  label?: string,
  onChange: (value: boolean) => any,
  value: boolean;
}

const c  = namespaceClassName('DefaultBooleanEditor');

const DefaultBooleanEditor: FunctionComponent<Props> = (props: Props) => {

  function renderLabel() {
    if (!!props.label) {
      return (
        <label className={c('label')}>{props.label}</label>
      );
    }

    return null;
  }

  function handleChange(e) {
    props.onChange(!props.value)
  }

  return (
    <div className={c('root')}>
      {renderLabel()}
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
