import editController from '~/api/modules/edit/controllers/edit';

test('editController', () => {
  expect(editController().toFunction()).toBeDefined();
});
