import * as React from 'react';
import {FunctionComponent} from "react";

interface Props {
  label?: string;
  maximum: number;
  minimum: number;
  onChange: (value: number) => any,
  value: number;
}

const DefaultNumberEditor: FunctionComponent<Props> = (props: Props) => {

  function renderLabel() {
    if (!!props.label) {
      return (
        <label className={'DefaultNumberEditor--label'}>{props.label}</label>
      );
    }

    return null;
  }

  function handleChange(e) {
    props.onChange(parseFloat(e.target.value))
  }

  return (
    <div className={'DefaultNumberEditor--root'}>
      {renderLabel()}
      <input
        type={'number'}
        defaultValue={props.value.toString()}
        onChange={handleChange}
      />
    </div>
  );
};

export default DefaultNumberEditor;
