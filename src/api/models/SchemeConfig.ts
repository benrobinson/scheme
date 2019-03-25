import GenerateController from "~/api/modules/generate/models/GenerateController";
import EditController from "~/api/modules/edit/models/EditController";
import ValidateController from "~/api/modules/validate/models/ValidateController";

export default interface SchemeConfig {
  generateController: GenerateController;
  editController: EditController;
  validateController: ValidateController;
}
