import Schema from '~/api/models/Schema';

import Generator from '~/api/modules/generate/models/Generator';

export default interface GenerateController {
  toFunction(): (schema: Schema) => any;
  withGenerator(generator: Generator<any>): GenerateController;
}
