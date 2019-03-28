import * as React from 'react';
import Editor from '~/api/modules/edit/models/Editor';
import EditorProps from '~/api/modules/edit/models/EditorProps';
import readWriter from "~api/util/ReadWriter";
import InputNumber from "~impl-default/modules/edit/components/InputNumber";

const DefaultNumberEditor: Editor<number> = (props: EditorProps<number>) => {

  const {onUpdate, path, schema, value} = props;
  const label = readWriter(props.schema)
    .into('title')
    .readAsOpt<string>()
    .getOrElse('Number Input');

  function handleChange(v: number) {
    onUpdate(path.write(v));
  }

  return (
    <InputNumber
      label={label}
      onChange={handleChange}
      value={value}
    />
  );
};

export default DefaultNumberEditor;
