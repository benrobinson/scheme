import Generator from "./Generator";
import Schema from "../../../models/Schema";

export default interface GenerateController {
  toFunction(): (schema: Schema) => any;
  withGenerator(generator: Generator<any>): GenerateController;
}
