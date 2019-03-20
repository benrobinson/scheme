import * as React from 'react';
import {FunctionComponent, ReactElement} from "react";
import namespaceClassName from '../../../util/namespaceClassName';

interface Props {
  label?: string;
  fields: ReactElement[]
}

const c = namespaceClassName('DefaultObjectEditor');

const DefaultObjectEditor: FunctionComponent<Props> = (props: Props) => {

  function renderField(field: ReactElement, i) {
    return (
      <div className={c('field')} key={i}>
        {field}
      </div>
    );
  }

  function renderLabel() {
    if (!!props.label) {
      return (
        <label className={c('label')}>{props.label}</label>
      );
    }

    return null;
  }

  return (
    <div className={c('root')}>
      <fieldset className={c('fields')}>
        {renderLabel()}
        {Object.keys(props.fields).map((k, i) => renderField(props.fields[k], i))}
      </fieldset>
    </div>
  );

};

export default DefaultObjectEditor;
