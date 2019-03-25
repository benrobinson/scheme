import * as React from 'react';
import namespaceClassName from '~/api/util/namespaceClassName';
import Editor from '~/api/modules/edit/models/Editor';
import EditorProps from '~/api/modules/edit/models/EditorProps';
import Label from '~/impl-default/modules/edit/components/Label';

const c = namespaceClassName('DefaultNumberEditor');

const DefaultNumberEditor: Editor<number> = (props: EditorProps<number>) => {

  const {onUpdate, path, schema, value} = props;

  function handleChange(e) {
    onUpdate(path.write(parseFloat(e.target.value)))
  }

  return (
    <div className={c('root')}>
      <Label defaultLabel={'Number Editor'} schema={schema} />
      <input
        className={c('value')}
        type={'number'}
        defaultValue={value.toString()}
        onChange={handleChange}
      />
    </div>
  );
};

export default DefaultNumberEditor;
