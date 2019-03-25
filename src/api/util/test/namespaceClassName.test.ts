import namespaceClassName from "~api/util/namespaceClassName";

test('namespaceClassName', () => {
  expect(namespaceClassName('Test')('one', 'two', 'three')).toBe('Test--one--two--three');
});
