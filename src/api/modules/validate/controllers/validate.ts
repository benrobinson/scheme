import validateArray from "./validateArray";
import validateObject from "./validateObject";
import validateString from "./validateString";
import validateEnum from "./validateEnum";
import Validator from "../models/Validator";
import Schema, {SchemaType} from "../../../models/Schema";
import ValidateController from "../models/ValidateController";

export const validate: Validator<any> = (value, schema: Schema): boolean => {
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
