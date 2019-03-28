import * as React from 'react';
import {ReactElement} from "react";
import namespaceClassName from "~api/util/namespaceClassName";

interface Props {
  label: string;
  children: ReactElement|ReactElement[]
}

const defaultProps: Partial<Props> = {
  label: 'Field Set',
  children: []
};

const c = namespaceClassName('FieldSet');

export default (props: Props) => {
  const {
    label,
    children
  } = {...defaultProps, ...props};

  return (
    <fieldset className={c('root')}>
      <legend className={c('label')}>{label}</legend>
      <div className={c('fields')}>
        {children}
      </div>
    </fieldset>
  )
}
