import ReadWriter from '~/api/util/ReadWriter';

import Validator from '~/api/modules/validate/models/Validator';

const validateEnum: Validator<any> = (value: any, schema) => {
  const enumValues = ReadWriter(schema).into('enum').readAsOpt<[]>().getOrElse([]);

  if (enumValues.length < 1) return true;

  return !!enumValues.find(v => value === v);
};

export default validateEnum;
