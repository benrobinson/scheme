// TODO use a library for this

export default function deepEquals(a: any, b: any) {
  if (typeof a !== typeof b) return false;

  switch(typeof a) {
    case "object":
      if (Array.isArray(a) !== Array.isArray(b)) return false;
      if (Array.isArray(a)) {
        return deepEqualsArray(a, b);
      } else {
        return deepEqualsObject(a, b);
      }
    default:
      return a === b;
  }
}

function deepEqualsArray(a: any[], b: any[]) {

  function hash(arr) {
    let copy = arr.slice();
    copy.sort();
    return JSON.stringify(copy);
  }

  return hash(a) === hash(b);
}

function deepEqualsObject(a: {}, b: {}) {

  function hash(obj) {
    return JSON.stringify(obj);
  }

  return hash(a) === hash(b);
}
