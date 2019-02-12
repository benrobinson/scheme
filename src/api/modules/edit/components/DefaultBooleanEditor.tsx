import React from 'react';
import lazyComponent from "../../../util/lazyComponent";

interface Props {
  label?: string,
  value: boolean;
}

const DefaultBooleanEditor = (props: Props) => {

  function renderLabel() {
    if (!!props.label) {
      return (
        <label className={'DefaultBooleanEditor--label'}>{props.label}</label>
      );
    }

    return null;
  }

  return (
    <div className={'DefaultBooleanEditor--root'}>
      {renderLabel()}
      <input type={'checkbox'} checked={props.value} />
    </div>
  );
};

export default (props: Props) => lazyComponent(DefaultBooleanEditor, props);
