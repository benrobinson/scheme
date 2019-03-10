import ReadWriter from "../../../util/ReadWriter";
import validate from "./validate";
import Validator from "../models/Validator";
import Schema from "../../../models/Schema";
import Option from "../../../util/Option";

const validateArray: Validator<[]> = (value: [], schema: Schema): boolean => {

  if (!Array.isArray(value)) return false;

  const schemaReader = ReadWriter(schema);
  const items = schemaReader.into('items').read();

  function validateContains(): boolean {
    const contains = schemaReader.into('contains').read();

    if (!contains) return true;

    for (let i = 0; i < value.length; i++) {
      if (validate(value[i], contains)) return true;
    }

    return false;
  }

  function validateItems(): boolean {
    if (!items) return true;
    if (Array.isArray(items)) return validateTuple();

    const itemSchema: Option<Schema> = schemaReader.into('items').readAsOpt<Schema>();

    if (itemSchema.isNone) return true;

    for (let i = 0; i < value.length; i++) {
      if (!validate(value[i], itemSchema.value)) return false
    }

    return true;
  }

  function validateLength(): boolean {
    const min = schemaReader.into('minItems').readAsOpt<number>().getOrElse(0);
    const max = schemaReader.into('maxItems').readAsOpt<number>().getOrElse(value.length);

    return (value.length >= min && value.length <= max);
  }

  function validateTuple(): boolean {
    if (!Array.isArray(items)) return true;

    if (value.length !== items.length) return false;

    for (let i = 0; i < items.length; i++) {
      if (!validate(value[i], items[i])) return false;
    }

    return true;
  }

  function validateUnique(): boolean {
    const isUnique = schemaReader.into('uniqueItems').readAsOpt<boolean>().getOrElse(false);

    if (!isUnique) return true;

    // @ts-ignore
    let used = new Set();
    for (let i = 0; i < value.length; i++) {
      if (used.has(value[i])) return false;
      used.add(value[i]);
    }

    return true;
  }

  return validateContains() && validateItems() && validateLength() && validateUnique();
};

export default validateArray;
