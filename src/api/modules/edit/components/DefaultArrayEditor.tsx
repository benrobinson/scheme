import * as React from "react";
import {FunctionComponent, ReactElement} from "react";
import {DefaultArrayItem} from "../controllers/edit";

interface Props {
  label?: string;
  onAddItem: () => any;
  onRemoveItem: (item: any) => any;
  values: DefaultArrayItem[];
}

const DefaultArrayEditor: FunctionComponent<Props> = (props: Props) => {

  function renderItem(item: DefaultArrayItem, i) {
    return (
      <li className={'DefaultArrayEditor--value'} key={i}>
        {item.editor}
        <button className={'DefaultArrayEditor--remove-button'} onClick={() => props.onRemoveItem(item.value)}>
          {'Remove'}
        </button>
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
      <button
        className={'DefaultArrayEditor--add-button'}
        onClick={props.onAddItem}
      >
        {'Add'}
      </button>
    </div>
  );
};

export default DefaultArrayEditor;
