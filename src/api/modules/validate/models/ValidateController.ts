import Schema from '~/api/models/Schema';

import Validator from '~/api/modules/validate/models/Validator';

export default interface ValidateController {
  toFunction(): (value: any, schema: Schema) => boolean;
  withValidator(validator: Validator<any>): ValidateController;
}
