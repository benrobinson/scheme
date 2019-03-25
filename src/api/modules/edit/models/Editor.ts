import {ReactElement} from 'react';

import EditorProps from '~/api/modules/edit/models/EditorProps';

export default interface Editor<T> {
  (props: EditorProps<T>): ReactElement;
}

