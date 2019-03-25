import {ReactElement} from 'react';

import Schema from '~/api/models/Schema';
import {ReadWriter} from '~/api/util/ReadWriter';

import OnUpdate from '~/api/modules/edit/models/OnUpdate';

export default interface EditorProps<T> {
  value: T;
  schema: Schema;
  onEdit?(props: EditorProps<any>): ReactElement;
  onUpdate: OnUpdate;
  path?: ReadWriter;
}
