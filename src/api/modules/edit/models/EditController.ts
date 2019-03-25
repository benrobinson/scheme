import Editor from '~/api/modules/edit/models/Editor';
import Editors from '~/api/modules/edit/models/Editors';

export default interface EditController {
  toFunction(): Editor<any>;
  withEditors(editors: Editors): EditController;
  withEditor<T>(key: string, editor: Editor<T>): EditController;
}

