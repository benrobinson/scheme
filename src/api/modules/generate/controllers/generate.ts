import ReadWriter from '~/api/util/ReadWriter';

import Schema, {SchemaType} from '~/api/models/Schema';

import Generator from '~/api/modules/generate/models/Generator';
import GenerateController from '~/api/modules/generate/models/GenerateController';

export const generate: Generator<any> = (schema: Schema) => {
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

const generateArray: Generator<[]> = (schema: Schema) =>
  ReadWriter(schema).into('default').readAsOpt<[]>().getOrElse([]);

const generateBoolean: Generator<boolean> = (schema: Schema) =>
  ReadWriter(schema).into('default').readAsOpt<boolean>().getOrElse(false);

const generateString: Generator<string> = (schema: Schema) =>
  ReadWriter(schema).into('default').readAsOpt<string>().getOrElse('');

const generateNumber: Generator<number> = (schema: Schema) =>
  ReadWriter(schema).into('default').readAsOpt<number>().getOrElse(0);

const generateObject: Generator<{}> = (schema: Schema) => {
  const schemaReader = ReadWriter(schema);
  const defaultValue = schemaReader.into('default').readAsOpt<{}>();

  if (!defaultValue.isNone) return defaultValue.value;

  const props = schemaReader.into('properties').readAsOpt<{}>();

  if (props.isNone) return {};

  return Object
    .keys(props.value)
    .reduce((defaultValue, key) => {
      const fieldValue = generate(props.value[key]);
      return {...defaultValue, [key]: fieldValue}
    }, {});
};

export default function generateController(generator: Generator<any> = generate): GenerateController {

  function toFunction(): Generator<any> {
    return generator;
  }

  function withGenerator(generator: Generator<any>): GenerateController {
    return generateController(generator);
  }

  return {
    toFunction,
    withGenerator
  };
}
