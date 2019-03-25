import GenerateController from "./modules/generate/models/GenerateController";
import EditController from "./modules/edit/models/EditController";
import ValidateController from "./modules/validate/models/ValidateController";

import generateController from "./modules/generate/controllers/generate";
import editController from "./modules/edit/controllers/edit";
import validateController from "./modules/validate/controllers/validate";
import Schema from "./models/Schema";
import {ReactElement} from "react";

export interface SchemeConfig {
  generateController: GenerateController;
  editController: EditController;
  validateController: ValidateController;
}

export interface Scheme {
  generate: (schema: Schema) => any;
  edit: (value: any, schema: Schema) => ReactElement;
  validate: (value: any, schema: Schema) => boolean;
}

export function schemeConfigDefault(): SchemeConfig {
  return {
    generateController: generateController(),
    editController: editController(),
    validateController: validateController()
  }
}

export default function scheme(schemeConfig: SchemeConfig): Scheme {
  return {
    generate: schemeConfig.generateController.toFunction(),
    edit: schemeConfig.editController.toFunction(),
    validate: schemeConfig.validateController.toFunction()
  };
}
