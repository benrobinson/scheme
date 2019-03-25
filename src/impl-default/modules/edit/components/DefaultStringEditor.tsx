import * as React from 'react';
import namespaceClassName from '~/api/util/namespaceClassName';
import EditorProps from '~/api/modules/edit/models/EditorProps';
import Editor from '~/api/modules/edit/models/Editor';
import Label from '~/impl-default/modules/edit/components/Label';

const c = namespaceClassName('DefaultNumberEditor');

const DefaultStringEditor: Editor<string> = (props: EditorProps<string>) => {

  const {onUpdate, path, schema, value} = props;

  function handleChange(e) {
    onUpdate(path.write(e.target.value))
  }

  return (
    <div className={c('root')}>
      <Label defaultLabel={'Text Editor'} schema={schema} />
      <input
        className={c('value')}
        type={'text'}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default DefaultStringEditor;
