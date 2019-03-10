import Editor from "./modules/edit/models/Editor";
import Generator from "./modules/generate/models/Generator";
import Validator from "./modules/validate/models/Validator";
import GenerateController from "./modules/generate/models/GenerateController";
import EditController from "./modules/edit/models/EditController";
import ValidateController from "./modules/validate/models/ValidateController";


interface SchemeConfig {
  generateController: GenerateController;
  editController: EditController;
  validateController: ValidateController;
}

interface Scheme {
  generate: Generator<any>;
  edit: Editor<any>;
  validate: Validator<any>;
}

function scheme(schemeConfig: SchemeConfig): Scheme {
  return {
    generate: schemeConfig.generateController.toFunction(),
    edit: schemeConfig.editController.toFunction(),
    validate: schemeConfig.validateController.toFunction()
  };
}
