import * as React from 'react';
import {FunctionComponent} from 'react';
import namespaceClassName from '../../../util/namespaceClassName';

interface Props {
  label?: string;
  onChange: (value: string) => any,
  value: string;
}

const c = namespaceClassName('DefaultNumberEditor');

const DefaultStringEditor: FunctionComponent<Props> = (props: Props) => {
  function renderLabel() {
    if (!!props.label) {
      return (
        <label className={c('label')}>{props.label}</label>
      );
    }

    return null;
  }

  function handleChange(e) {
    props.onChange(e.target.value)
  }

  return (
    <div className={c('root')}>
      {renderLabel()}
      <input
        className={c('value')}
        type={'text'}
        value={props.value}
        onChange={handleChange}
      />
    </div>
  );
};

export default DefaultStringEditor;
