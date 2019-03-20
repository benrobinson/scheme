import Option, {option} from "./Option";

export interface ReadWriter {
  fromJson: (input: string) => ReadWriter;
  isEmpty: boolean;
  into: (key: string|number) => ReadWriter;
  read: <B>() => B;
  readAsOpt: <B>() => Option<B>;
  toJson: () => string;
  write: <B>(value: B) => any;
  writePath: <B>(path: (string|number)[], value: B) => any;
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

    function write<B>(value: B): any {
      return writePath(path, value);
    }

    function writePath<B>(p: (string|number)[], value: B): any {
      const origIsArray = Array.isArray(original);
      let updated = origIsArray ? [...original] : {...original};
      let cursor = updated;

      for (let i = 0; i < p.length - 1; i++) {
        if (!cursor.hasOwnProperty(p[i]) || typeof cursor[p[i]] !== 'object') {
          cursor[p[i]] = {};
        }

        if (Array.isArray(cursor[p[i]])) {
          cursor[p[i]] = [...cursor[p[i]]];
        } else {
          cursor[p[i]] = {...cursor[p[i]]};
        }

        cursor = cursor[p[i]];
      }

      if (p.length > 0) {
        cursor[p[p.length - 1]] = value;
      } else {
        updated = value;
      }

      return readWriter(origIsArray ? [...updated] : {...updated}).read<any>();
    }

    function fromJson(input: string): ReadWriter {
      return readWriter(JSON.parse(input));
    }

    function toJson(): string {
      return JSON.stringify(current);
    }

    return {
      fromJson,
      isEmpty: (!!original),
      into,
      read,
      readAsOpt,
      toJson,
      write,
      writePath
    }
  }

  return rw(original, []);
}
