export default interface Schema {
  type: string;
}

export interface Schemas {
  [key: string]: Schema;
}

export enum SchemaType {
  ARRAY = 'array',
  BOOLEAN = 'boolean',
  OBJECT = 'object',
  NUMBER = 'number',
  NULL = 'null',
  STRING = 'string'
}
