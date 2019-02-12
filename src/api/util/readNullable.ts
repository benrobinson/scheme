import Option, {option} from './option';

interface NullableReader<A> {
  asOpt: <B>() => Option<B>;
  getOrElse: (defaultValue: any) => any;
  into: (field: string) => NullableReader<A>;
}

export function readNullable<A>(obj: any): NullableReader<A> {

  function asOpt<B>(): Option<B> {
    return option(obj);
  }

  function getOrElse(defaultValue: any): any {
    return !!obj ? obj : defaultValue;
  }

  function into(field: string): NullableReader<A> {
    if (!!obj) {
      return readNullable(obj[field] || null);
    } else {
      return readNullable(null);
    }
  }

  return {
    asOpt,
    getOrElse,
    into
  };

}
