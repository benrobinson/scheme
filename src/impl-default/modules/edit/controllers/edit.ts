import EditController from '~/api/modules/edit/models/EditController';
import editController from '~/api/modules/edit/controllers/edit';
import DefaultEditor from "~/api/modules/edit/models/DefaultEditor";

import DefaultArrayEditor from "~/impl-default/modules/edit/components/DefaultArrayEditor";
import DefaultBooleanEditor from "~/impl-default/modules/edit/components/DefaultBooleanEditor";
import DefaultNumberEditor from "~/impl-default/modules/edit/components/DefaultNumberEditor";
import DefaultObjectEditor from "~/impl-default/modules/edit/components/DefaultObjectEditor";
import DefaultStringEditor from "~/impl-default/modules/edit/components/DefaultStringEditor";

const defaultEditController: EditController = editController({
  [DefaultEditor.ARRAY]: DefaultArrayEditor,
  [DefaultEditor.BOOLEAN]: DefaultBooleanEditor,
  [DefaultEditor.NUMBER]: DefaultNumberEditor,
  [DefaultEditor.OBJECT]: DefaultObjectEditor,
  [DefaultEditor.STRING]: DefaultStringEditor,
});

export default defaultEditController;
