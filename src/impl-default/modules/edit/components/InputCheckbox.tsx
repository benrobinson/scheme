import * as React from 'react';
import namespaceClassName from "~api/util/namespaceClassName";

interface Props {
  label: string;
  name?: string;
  onChange(value: boolean): any;
  value: boolean;
}

const defaultProps: Partial<Props> = {
  label: 'Checkbox Input',
  name: '',
  onChange: (value: boolean) => {},
  value: false
};

const c = namespaceClassName('InputCheckbox');

export default (props: Props) => {

  const {
    label,
    name,
    onChange,
    value } = {...defaultProps, ...props};

  function handleChange() {
    return onChange(!value);
  }

  return (
    <div className={`${c('root')} ${value ? c('selected') : ''}`} onClick={handleChange}>
      <label className={c('label')}>{label}</label>
      <input
        value={+value}
        className={c('value')}
        name={name}
        onChange={handleChange}
        type={'checkbox'}
      />
    </div>
  )
}
