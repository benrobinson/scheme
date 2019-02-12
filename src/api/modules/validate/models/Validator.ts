export default interface Validator<T> {
  (value: T, schema: object): boolean;
}
