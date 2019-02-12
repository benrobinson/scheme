export default interface Schema {
  type: string;
}

export enum SchemaType {
  ARRAY = "array",
  BOOLEAN = "boolean",
  OBJECT = "object",
  NUMBER = "number",
  NULL = "null",
  STRING = "string"
}
