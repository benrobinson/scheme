import * as React from 'react';
import {ReactElement} from 'react';
import readWriter from '~/api/util/ReadWriter';
import Editor from '~/api/modules/edit/models/Editor';
import EditorProps from '~/api/modules/edit/models/EditorProps';
import InputText from "~impl-default/modules/edit/components/InputText";
import FieldSet from "~impl-default/modules/edit/components/FieldSet";

interface Illustration {
  link: string;
  type: string;
}

const IllustrationEditor: Editor<Illustration> = (props: EditorProps<Illustration>): ReactElement => {
  const {onUpdate, path, schema, value} = props;
  
  const schemaReader = readWriter(schema);
  const label = schemaReader.into('title').readAsOpt<string>().getOrElse('Illustration Editor');
  const onChangeLink = (link: string) => {
    const type = link.indexOf('.mov') !== -1 ? 'video' : 'image';
    onUpdate(path.write({link, type}));
  };

  return (
    <FieldSet label={label}>
      <InputText
        label={'Illustration URL'}
        onChange={onChangeLink}
        value={value.link}
      />
    </FieldSet>
  )
};

export default IllustrationEditor;
