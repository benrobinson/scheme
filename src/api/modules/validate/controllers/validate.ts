import Schema, {SchemaType} from '~/api/models/Schema';
import validateArray from '~/api/modules/validate/controllers/validateArray';
import validateObject from '~/api/modules/validate/controllers/validateObject';
import validateString from '~/api/modules/validate/controllers/validateString';
import validateEnum from '~/api/modules/validate/controllers/validateEnum';
import Validator from '~/api/modules/validate/models/Validator';
import ValidateController from '~/api/modules/validate/models/ValidateController';

export const validate: Validator<any> = (value: any, schema: Schema): boolean => {
  switch(schema.type) {
    case SchemaType.ARRAY:
      return validateArray(value, schema) && validateEnum(value, schema);
    case SchemaType.OBJECT:
      return validateObject(value, schema) && validateEnum(value, schema);
    case SchemaType.STRING:
      return validateString(value, schema) && validateEnum(value, schema);
    default:
      return typeof value === schema.type; // TODO add better validation for all primitives
  }
};

export default function validatorConfig(validator: Validator<any> = validate): ValidateController {

  function withValidator(validator: Validator<any>): ValidateController {
    return validatorConfig(validator);
  }

  function toFunction(): Validator<any> {
    return validator;
  }

  return {
    toFunction,
    withValidator
  };
}
