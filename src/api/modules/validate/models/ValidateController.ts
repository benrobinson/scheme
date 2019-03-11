import Validator from "./Validator";
import Schema from "../../../models/Schema";

export default interface ValidateController {
  toFunction(): (value: any, schema: Schema) => boolean;
  withValidator(validator: Validator<any>): ValidateController;
}
