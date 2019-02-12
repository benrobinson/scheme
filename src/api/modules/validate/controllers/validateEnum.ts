import Validator from "../models/Validator";
import {readNullable} from "../../../util/readNullable";

const validateEnum: Validator<any> = (value: any, schema) => {
  const enumValues = readNullable(schema).into("enum").getOrElse([]);

  if (enumValues.length < 1) return true;

  return !!enumValues.find(v => value === v);
};

export default validateEnum;
