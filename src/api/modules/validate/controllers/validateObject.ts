import Schema from '~/api/models/Schema';
import ReadWriter from '~/api/util/ReadWriter';

import {validate} from '~/api/modules/validate/controllers/validate';
import Validator from '~/api/modules/validate/models/Validator';

const validateObject: Validator<object> = (value: {}, schema: Schema): boolean => {

  if (typeof value !== 'object') return false;

  const schemaReader = ReadWriter(schema);
  const valueProps = Object.keys(value);

  function validateRequired() {
    const requiredProps = schemaReader.into('required').readAsOpt<[]>().getOrElse([]);

    if (requiredProps.length > valueProps.length) return false;

    for (let p = 0; p < requiredProps.length; p++) {
      if (!value[requiredProps[p]]) return false;
    }

    return true;
  }

  function validateChildren() {
    const properties = schemaReader.into('properties').readAsOpt<{}>().getOrElse({});
    const schemaProps = Object.keys(properties);

    return schemaProps.reduce((isValid, prop) => {
      return validate(value[prop], properties[prop]);
    }, true);
  }

  return validateRequired() && validateChildren();
};

export default validateObject;
