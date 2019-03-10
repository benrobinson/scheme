import Validator from "../models/Validator";
import ReadWriter from "../../../util/ReadWriter";

const validateEnum: Validator<any> = (value: any, schema) => {
  const enumValues = ReadWriter(schema).into("enum").readAsOpt<[]>().getOrElse([]);

  if (enumValues.length < 1) return true;

  return !!enumValues.find(v => value === v);
};

export default validateEnum;
