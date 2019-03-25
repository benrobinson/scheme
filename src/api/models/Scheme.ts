import {ReactElement} from 'react';
import Schema from '~/api/models/Schema';

export default interface Scheme {
  generate: (schema: Schema) => any;
  edit: (value: any, schema: Schema) => ReactElement;
  validate: (value: any, schema: Schema) => boolean;
}
