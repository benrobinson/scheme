export default interface Option<A> {
  isNone: boolean;
  value: A|null;
  map: <B>(f: (A) => B) => Option<B>;
  flatMap: <B>(f: (A) => Option<B>) => Option<B>;
  getOrElse: (defaultValue: A) => A
}

export function none<A>(): Option<A> {
  return {
    isNone: true,
    value: null,
    map: <B>(_: (A) => B) => none<B>(),
    flatMap: <B>(_: (A) => Option<B>) => none<B>(),
    getOrElse: (defaultValue: A) => defaultValue
  }
}

export function some<A>(value: A): Option<A> {
  return {
    isNone: false,
    value: value,
    map: <B>(f: (A) => B) => option(f(value)),
    flatMap: <B>(f: (A) => Option<B>) => f(value),
    getOrElse: (_: A) => value
  }
}

export function option<A>(value: A|undefined|null): Option<A> {
  return typeof value === 'undefined' || value === null
    ? none<A>()
    : some<A>(value);
}
