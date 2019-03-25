import {ReactElement} from "react";
import Schema from "../../../models/Schema";
import readWriter from "../../../util/ReadWriter";
import * as React from "react";
import namespaceClassName from "../../../util/namespaceClassName";

interface Props {
  defaultLabel: string;
  schema: Schema;
}

const c = namespaceClassName('Label');

export default function Label(props: Props): ReactElement {
  const label = readWriter(props.schema)
    .into('title')
    .readAsOpt<string>()
    .getOrElse(props.defaultLabel);

  return <label className={c('root')}>{label}</label>;
}
