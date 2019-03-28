import * as React from 'react';
import EditorProps from '~/api/modules/edit/models/EditorProps';
import Editor from '~/api/modules/edit/models/Editor';
import readWriter from "~api/util/ReadWriter";
import InputText from "~impl-default/modules/edit/components/InputText";

const DefaultStringEditor: Editor<string> = (props: EditorProps<string>) => {

  const {onUpdate, path, schema, value} = props;
  const label = readWriter(props.schema)
    .into('title')
    .readAsOpt<string>()
    .getOrElse('Text Input');

  function handleChange(value: string) {
    onUpdate(path.write(value));
  }

  return (
    <InputText
      label={label}
      onChange={handleChange}
      value={value}
    />
  );
};

export default DefaultStringEditor;
