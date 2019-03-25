import readWriter from '~/api/util/ReadWriter';

test('readWriter', () => {
  const testObj = {
    foo: {
      bar: {
        baz: [
          {
            qux: 'test'
          }
        ]
      }
    }
  };

  const testReadWriter = readWriter(testObj);

  expect(testReadWriter.into('foo').into('bar').into('baz').into(0).into('qux').read<string>()).toBe('test');
  expect(testReadWriter.into('foo').write('OVERWRITTEN')).toEqual({foo: 'OVERWRITTEN'});
  expect(testReadWriter.into('foo').into('bar').into('baz').into(0).into('qux').write('test again')).toEqual({
    foo: {
      bar: {
        baz: [
          {
            qux: 'test again'
          }
        ]
      }
    }
  });
  expect(testReadWriter.into('foo').into('coo').write('new')).toEqual({
    foo: {
      bar: {
        baz: [
          {
            qux: 'test'
          }
        ]
      },
      coo: 'new'
    }
  });
  expect(testReadWriter.into('foo').into('bar').into('baz').into(0).into('qux').readAsOpt<string>().isNone).toBe(false);
  expect(testReadWriter.into('not').into('here').readAsOpt<string>().isNone).toBe(true);
});
