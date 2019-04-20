import SchemeConfig from "~/api/models/SchemeConfig";
import generateController from "~/api/modules/generate/controllers/generate";
import editController from "~/impl-default/modules/edit/controllers/edit";
import validateController from "~/api/modules/validate/controllers/validate";

const schemeConfigDefault: SchemeConfig = {
  generateController: generateController(),
  editController: editController,
  validateController: validateController()
};

export default schemeConfigDefault;
