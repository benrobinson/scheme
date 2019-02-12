import Validator from "../models/Validator";
import {readNullable} from "../../../util/readNullable";
import Option from "../../../util/option";
import Schema from "../../../models/Schema";
import validateEnum from "./validateEnum";

const validateString: Validator<string> = (value: string, schema: Schema): boolean => {

  if (typeof value !== "string") return false;

  const schemaReader = readNullable(schema);

  function validateLength() {
    const min = schemaReader.into("minLength").getOrElse(0);
    const max = schemaReader.into("maxLength").getOrElse(value.length);

    return (value.length >= min && value.length <= max);
  }

  function validatePattern() {
    const pattern: Option<RegExp> = schemaReader
      .into("pattern")
      .asOpt()
      .map<RegExp>(s => new RegExp(s));

    if (pattern.isNone) return true;

    return pattern
      .map<boolean>(p => p.test(value))
      .getOrElse(false);
  }

  return validateLength() && validatePattern();
};

export default validateString;
