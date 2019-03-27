import * as React from 'react';
import namespaceClassName from '~/api/util/namespaceClassName';
import EditorProps from '~/api/modules/edit/models/EditorProps';
import Editor from '~/api/modules/edit/models/Editor';
import readWriter from "~api/util/ReadWriter";
import TextInput, {TextInputResult} from "~impl-default/modules/edit/components/TextInput";

const c = namespaceClassName('DefaultNumberEditor');

const DefaultStringEditor: Editor<string> = (props: EditorProps<string>) => {

  const {onUpdate, path, schema, value} = props;
  const label = readWriter(props.schema)
    .into('title')
    .readAsOpt<string>()
    .getOrElse('Text Editor');

  function handleChange(result: TextInputResult) {
    if (result.isValid) {
      onUpdate(path.write(result.value))
    }
  }

  return (
    <div className={c('root')}>
      <TextInput
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default DefaultStringEditor;
