import React from 'react';
import lazyComponent from "../../../util/lazyComponent";

interface Props {
  label?: string;
  value: string;
}

const DefaultStringEditor = (props: Props) => {

  function renderLabel() {
    if (!!props.label) {
      return (
        <label className={'DefaultStringEditor--label'}>{props.label}</label>
      );
    }

    return null;
  }

  return (
    <div className={'DefaultStringEditor--root'}>
      {renderLabel()}
      <input type={'text'} value={props.value} />
    </div>
  );
};

export default (props: Props) => lazyComponent(DefaultStringEditor, props);
