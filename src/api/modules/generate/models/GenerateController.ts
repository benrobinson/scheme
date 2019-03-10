import Generator from "./Generator";

export default interface GenerateController {
  toFunction(): Generator<any>;
  withGenerator(generator: Generator<any>): GenerateController;
}
