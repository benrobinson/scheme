import {option} from '~/api/util/Option';

test('option', () => {
  expect(option<any>(undefined).isNone).toBe(true);
  expect(option<string>(null).isNone).toBe(true);
  expect(option<string>('test').isNone).toBe(false);
  expect(option<string>('test').getOrElse('nope')).toBe('test');
  expect(option<number>(null).getOrElse(10)).toBe(10);
  expect(option<number>(0).getOrElse(10)).toBe(0);
  expect(option<boolean>(false).getOrElse(true)).toBe(false);
});
