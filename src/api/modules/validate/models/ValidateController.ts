import Validator from "./Validator";

export default interface ValidateController {
  toFunction(): Validator<any>;
  withValidator(validator: Validator<any>): ValidateController;
}
