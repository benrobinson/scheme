import * as React from 'react';
import {FunctionComponent} from "react";

interface Props {
  label?: string,
  onChange: (value: boolean) => any,
  value: boolean;
}

const DefaultBooleanEditor: FunctionComponent<Props> = (props: Props) => {

  function renderLabel() {
    if (!!props.label) {
      return (
        <label className={'DefaultBooleanEditor--label'}>{props.label}</label>
      );
    }

    return null;
  }

  function handleChange(e) {
    props.onChange(!props.value)
  }

  return (
    <div className={'DefaultBooleanEditor--root'}>
      {renderLabel()}
      <input
        type={'checkbox'}
        checked={props.value}
        onChange={handleChange}
      />
    </div>
  );
};

export default DefaultBooleanEditor;
