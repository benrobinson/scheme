import * as React from 'react';
import namespaceClassName from '~/api/util/namespaceClassName';
import Editor from '~/api/modules/edit/models/Editor';
import EditorProps from '~/api/modules/edit/models/EditorProps';
import Label from '~/impl-default/modules/edit/components/Label';

const c  = namespaceClassName('DefaultBooleanEditor');

const DefaultBooleanEditor: Editor<boolean> = (props: EditorProps<boolean>) => {

  const {onUpdate, path, schema, value} = props;

  function handleChange() {
    onUpdate(path.write(!props.value))
  }

  return (
    <div className={c('root')}>
      <Label defaultLabel={'Boolean Editor'} schema={schema} />
      <input
        className={c('value')}
        type={'checkbox'}
        checked={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default DefaultBooleanEditor;
