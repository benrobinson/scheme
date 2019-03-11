import * as React from 'react';
import {FunctionComponent, ReactElement} from "react";

interface Props {
  label?: string;
  fields: ReactElement[]
}

const DefaultObjectEditor: FunctionComponent<Props> = (props: Props) => {

  function renderField(field: ReactElement, i) {
    return (
      <div className='DefaultObjectEditor--field' key={i}>
        {field}
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

export default DefaultObjectEditor;
