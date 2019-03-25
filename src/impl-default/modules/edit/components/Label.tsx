import * as React from 'react';
import {ReactElement} from 'react';

import Schema from '~/api/models/Schema';

import namespaceClassName from '~/api/util/namespaceClassName';
import readWriter from '~/api/util/ReadWriter';

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
