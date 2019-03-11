import * as React from "react";
import {FunctionComponent, ReactElement} from "react";

interface Props {
  label?: string;
  values: ReactElement[];
}

const DefaultArrayEditor: FunctionComponent<Props> = (props: Props) => {

  function renderItem(item: ReactElement, i) {
    return (
      <li className={'DefaultArrayEditor--value'} key={i}>
        {item}
      </li>
    );
  }

  function renderLabel() {
    if (!!props.label) {
      return (
        <label className={'DefaultArrayEditor--label'}>{props.label}</label>
      );
    }

    return null;
  }

  return (
    <div className={'DefaultArrayEditor--root'}>
      {renderLabel()}
      <ul className={'DefaultArrayEditor---values'}>
        {props.values.map(renderItem)}
      </ul>
    </div>
  );
};

export default DefaultArrayEditor;
