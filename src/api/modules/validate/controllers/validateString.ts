import ReadWriter from '~/api/util/ReadWriter';
import Option from '~/api/util/Option';
import Schema from '~/api/models/Schema';

import Validator from '~/api/modules/validate/models/Validator';

const validateString: Validator<string> = (value: string, schema: Schema): boolean => {

  if (typeof value !== 'string') return false;

  const schemaReader = ReadWriter(schema);

  function validateLength() {
    const min = schemaReader.into('minLength').readAsOpt<number>().getOrElse(0);
    const max = schemaReader.into('maxLength').readAsOpt<number>().getOrElse(value.length);

    return (value.length >= min && value.length <= max);
  }

  function validatePattern() {
    const pattern: Option<RegExp> = schemaReader
      .into('pattern')
      .readAsOpt<RegExp>()
      .map<RegExp>(s => new RegExp(s));

    if (pattern.isNone) return true;

    return pattern
      .map<boolean>(p => p.test(value))
      .getOrElse(false);
  }

  return validateLength() && validatePattern();
};

export default validateString;
