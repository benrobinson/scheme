import React, {Component} from 'react';
import lazyComponent, {LazyComponent} from "../../../util/lazyComponent";

interface Props {
  label?: string;
  values: LazyComponent<Component>[];
}

const DefaultArrayEditor = (props: Props) => {

  function renderItem(item, i) {
    return (
      <li className={'DefaultArrayEditor--value'} key={i}>
        {item.get()}
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

export default (props: Props) => lazyComponent(DefaultArrayEditor, props);