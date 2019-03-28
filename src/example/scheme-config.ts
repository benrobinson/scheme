import SchemeConfig from '~/api/models/SchemeConfig';
import schemeConfigDefault from '~/impl-default/scheme-config-default';
import IllustrationEditor from '~/example/modules/edit/components/IllustrationEditor';

const schemeConfig: SchemeConfig = {
  editController: schemeConfigDefault.editController.withEditor('IllustrationEditor', IllustrationEditor),
  generateController: schemeConfigDefault.generateController,
  validateController: schemeConfigDefault.validateController
};

export default schemeConfig;
