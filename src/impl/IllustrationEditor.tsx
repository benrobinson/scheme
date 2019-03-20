import * as React from 'react';
import Editor from "../api/modules/edit/models/Editor";
import Schema from "../api/models/Schema";
import readWriter, {ReadWriter} from "../api/util/ReadWriter";
import OnUpdate from "../api/modules/edit/models/OnUpdate";
import {ReactElement} from "react";

interface Illustration {
  link: string;
  type: string;
}

const IllustrationEditor: Editor<Illustration> = (value: Illustration, schema: Schema, path: ReadWriter, onUpdate: OnUpdate): ReactElement => {
  const schemaReader = readWriter(schema);
  const label = schemaReader.into('title').readAsOpt<string>().getOrElse('Illustration Editor');
  const onChangeLink = (link: string) => {
    const type = link.indexOf('.mov') !== -1 ? 'video' : 'image';
    onUpdate(path.write({link, type}));
  };

  return (
    <div className={'IllustrationEditor--root'}>
      <label className={'IllustrationEditor--label'}>{label}</label>
      <input className={'IllustrationEditor--link'} defaultValue={value.link} onChange={e => onChangeLink(e.target.value)} />
    </div>
  )
};

export default IllustrationEditor;
