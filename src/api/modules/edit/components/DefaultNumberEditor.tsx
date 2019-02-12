import React from 'react';
import lazyComponent from "../../../util/lazyComponent";

interface Props {
  label?: string;
  maximum: number;
  minimum: number;
  value: number;
}

const DefaultNumberEditor = (props: Props) => {

  function renderLabel() {
    if (!!props.label) {
      return (
        <label className={'DefaultNumberEditor--label'}>{props.label}</label>
      );
    }

    return null;
  }

  return (
    <div className={'DefaultNumberEditor--root'}>
      {renderLabel()}
      <input type={'number'} defaultValue={props.value} />
    </div>
  );
};

export default (props: Props) => lazyComponent(DefaultNumberEditor, props);
