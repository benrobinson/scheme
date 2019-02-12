import React, {Component} from 'react';
import lazyComponent, {LazyComponent} from "../../../util/lazyComponent";

interface Props {
  label?: string;
  fields: {
    [key: string]: LazyComponent<Component>
  };
}

const DefaultObjectEditor = (props: Props) => {

  function renderField(field, i) {
    return (
      <div className='DefaultObjectEditor--field' key={i}>
        {field.render()}
      </div>
    );
  }

  function renderLabel() {
    if (!!props.label) {
      return (
        <label className={'DefaultObjectEditor--label'}>{props.label}</label>
      );
    }

    return null;
  }

  return (
    <div className={'DefaultObjectEditor--root'}>
      <fieldset className={'DefaultObjectEditor--fields'}>
        {renderLabel()}
        {Object.keys(props.fields).map((k, i) => renderField(props.fields[k], i))}
      </fieldset>
    </div>
  );

};

export default (props: Props) => lazyComponent(DefaultObjectEditor, props);
