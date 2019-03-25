import generateController from '~/api/modules/generate/controllers/generate';

test('generateController', () => {
  const generate = generateController().toFunction();

  expect(generate({type: 'string', default: 'test'})).toEqual('test');
  expect(generate({
    type: 'object',
    properties: {
      foo: {
        type: 'string'
      },
      bar: {
        type: 'number'
      }
    }
  })).toEqual({
    foo: '',
    bar: 0
  });
});
