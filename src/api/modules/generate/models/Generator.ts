import Schema from '~/api/models/Schema';

export default interface Generator<T> {
  (schema: Schema): T;
}
