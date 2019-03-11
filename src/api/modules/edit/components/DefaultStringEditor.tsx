import * as React from 'react';
import {FunctionComponent} from 'react';

interface Props {
  label?: string;
  onChange: (value: string) => any,
  value: string;
}

const DefaultStringEditor: FunctionComponent<Props> = (props: Props) => {
  function renderLabel() {
    if (!!props.label) {
      return (
        <label className={'DefaultStringEditor--label'}>{props.label}</label>
      );
    }

    return null;
  }

  function handleChange(e) {
    props.onChange(e.target.value)
  }

  return (
    <div className={'DefaultStringEditor--root'}>
      {renderLabel()}
      <input
        type={'text'}
        value={props.value}
        onChange={handleChange}
      />
    </div>
  );
};

export default DefaultStringEditor;
