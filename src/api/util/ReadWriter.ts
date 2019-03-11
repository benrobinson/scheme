import Option, {option} from "./Option";

export interface ReadWriter {
  isEmpty: boolean;
  into: (key: string|number) => ReadWriter
  read: <B>() => B;
  readAsOpt: <B>() => Option<B>;
  write: <B>(value: B) => ReadWriter;
  writePath: <B>(path: (string|number)[], value: B) => ReadWriter;
}

export default function readWriter(original: any): ReadWriter {

  function rw(current: any, path: (string|number)[]): ReadWriter {

    function readAsOpt<B>(): Option<B> {
      return option(read());
    }

    function into(key: string|number): ReadWriter {
      if (!!current) {
        return rw(current[key] || null, [...path, key]);
      } else {
        return rw(null, [...path, key]);
      }
    }

    function read<B>(): B|null {
      return current || null;
    }

    function write<B>(value: B): ReadWriter {
      return writePath(path, value);
    }

    function writePath<B>(p: (string|number)[], value: B): ReadWriter {
      let updated = {...original};
      let cursor = updated;

      for (let i = 0; i < p.length - 1; i++) {
        if (!cursor.hasOwnProperty(p[i]) || typeof cursor[p[i]] !== 'object') {
          cursor[p[i]] = {};
        }

        cursor[p[i]] = {...cursor[p[i]]};
        cursor = cursor[p[i]];
      }

      cursor[p[p.length - 1]] = value;

      return readWriter({...updated});
    }

    return {
      isEmpty: (!!original),
      into,
      read,
      readAsOpt,
      write,
      writePath
    }
  }

  return rw(original, []);
}
