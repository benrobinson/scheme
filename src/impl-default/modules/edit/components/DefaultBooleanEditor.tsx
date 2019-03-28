import * as React from 'react';
import namespaceClassName from '~/api/util/namespaceClassName';
import Editor from '~/api/modules/edit/models/Editor';
import EditorProps from '~/api/modules/edit/models/EditorProps';
import Label from '~/impl-default/modules/edit/components/Label';
import InputCheckbox from "~impl-default/modules/edit/components/InputCheckbox";
import readWriter from "~api/util/ReadWriter";

const c  = namespaceClassName('DefaultBooleanEditor');

const DefaultBooleanEditor: Editor<boolean> = (props: EditorProps<boolean>) => {

  const {onUpdate, path, schema, value} = props;
  const label = readWriter(props.schema)
    .into('title')
    .readAsOpt<string>()
    .getOrElse('Boolean Input');

  function handleChange(value) {
    onUpdate(path.write(value))
  }

  return (
    <InputCheckbox
      label={label}
      onChange={handleChange}
      value={value}
    />
  );
};

export default DefaultBooleanEditor;
