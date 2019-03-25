import validateController from '~/api/modules/validate/controllers/validate';

test('validateController', () => {

  const validate = validateController().toFunction();

  const testValue = {
    foo: 'bar',
    baz: 1,
    qux: false
  };

  const testSchema = {
    type: 'object',
    properties: {
      foo: {
        type: 'string'
      },
      baz: {
        type: 'number'
      },
      qux: {
        type: 'boolean'
      }
    }
  };

  expect(validate(testValue, testSchema)).toBe(true);
  expect(validate(testValue, {type: 'string'})).toBe(false);
});
