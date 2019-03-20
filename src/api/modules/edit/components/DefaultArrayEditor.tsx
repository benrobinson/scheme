import * as React from "react";
import {FunctionComponent, ReactElement} from "react";
import {DefaultArrayItem} from "../controllers/edit";
import namespaceClassName from '../../../util/namespaceClassName';

interface Props {
  label?: string;
  onAddItem: () => any;
  onRemoveItem: (item: any) => any;
  values: DefaultArrayItem[];
}

const c = namespaceClassName('DefaultArrayEditor');

const DefaultArrayEditor: FunctionComponent<Props> = (props: Props) => {

  function renderItem(item: DefaultArrayItem, i) {
    return (
      <li className={c('value')} key={i}>
        {item.editor}
        <button className={c('remove-button')} onClick={() => props.onRemoveItem(item.value)}>
          {'Remove'}
        </button>
      </li>
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
      {renderLabel()}
      <ul className={c('values')}>
        {props.values.map(renderItem)}
      </ul>
      <button
        className={c('add-button')}
        onClick={props.onAddItem}
      >
        {'Add'}
      </button>
    </div>
  );
};

export default DefaultArrayEditor;
