import validate from "./validate";
import Validator from "../models/Validator";
import Schema from "../../../models/Schema";
import {readNullable} from "../../../util/readNullable";

const validateObject: Validator<object> = (value: {}, schema: Schema): boolean => {

  if (typeof value !== 'object') return false;

  const schemaReader = readNullable(schema);
  const valueProps = Object.keys(value);

  function validateRequired() {
    const requiredProps = schemaReader.into("required").getOrElse([]);

    if (requiredProps.length > valueProps.length) return false;

    for (let p = 0; p < requiredProps.length; p++) {
      if (!value[requiredProps[p]]) return false;
    }

    return true;
  }

  function validateChildren() {
    const properties = schemaReader.into("properties").getOrElse({});
    const schemaProps = Object.keys(properties);

    return schemaProps.reduce((isValid, prop) => {
      return validate(value[prop], properties[prop]);
    }, true);
  }

  return validateRequired() && validateChildren();
};

export default validateObject;
