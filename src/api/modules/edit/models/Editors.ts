import Editor from '~/api/modules/edit/models/Editor';

export default interface Editors {
  [key: string]: Editor<any>;
}
