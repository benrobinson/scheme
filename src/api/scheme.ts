import SchemeConfig from "~/api/models/SchemeConfig";
import Scheme from "~/api/models/Scheme";

export default function scheme(schemeConfig: SchemeConfig): Scheme {
  return {
    generate: schemeConfig.generateController.toFunction(),
    edit: schemeConfig.editController.toFunction(),
    validate: schemeConfig.validateController.toFunction()
  };
}
