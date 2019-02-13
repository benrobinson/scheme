import Generator from "../models/Generator";
import Schema, {SchemaType} from "../../../models/Schema";
import {readNullable} from "../../../util/readNullable";

const generate: Generator<any> = (schema: Schema) => {
  switch (schema.type) {
    case SchemaType.ARRAY:
      return generateArray(schema);
    case SchemaType.BOOLEAN:
      return generateBoolean(schema);
    default:
    case SchemaType.NULL:
      return null;
    case SchemaType.NUMBER:
      return generateNumber(schema);
    case SchemaType.OBJECT:
      return generateObject(schema);
    case SchemaType.STRING:
      return generateString(schema);
  }
};

export default generate;

const generateArray: Generator<[]> = (schema: Schema) =>
  readNullable(schema).into('default').getOrElse([]);

const generateBoolean: Generator<string> = (schema: Schema) =>
  readNullable(schema).into('default').getOrElse(false);

const generateString: Generator<string> = (schema: Schema) =>
  readNullable(schema).into('default').getOrElse('');

const generateNumber: Generator<number> = (schema: Schema) =>
  readNullable(schema).into('default').getOrElse(0);

const generateObject: Generator<{}> = (schema: Schema) => {
  const schemaReader = readNullable(schema);
  const defaultValue = schemaReader.into('default').asOpt();

  if (!defaultValue.isNone) return defaultValue.value;

  const props = schemaReader.into('properties').asOpt();

  if (props.isNone) return {};

  return Object
    .keys(props.value)
    .reduce((defaultValue, key) => {
      const fieldValue = generate(props.value[key]);
      return {...defaultValue, [key]: fieldValue}
    }, {});
};
