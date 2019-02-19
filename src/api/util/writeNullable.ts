function writeNullable(obj) {

  // Return original object if unsuccessful at making updates.
  function updatePath(path, value) {
    let updated = {...obj};
    let cursor = updated;

    for (let p = 0; p < path.length - 1; p++) {
      if (typeof cursor !== 'object' && typeof cursor[path[p]] !== 'object') return writeNullable(obj);

      if (!cursor.hasOwnProperty(path[p])) {
        cursor[path[p]] = {};
      }

      cursor = cursor[path[p]];
    }

    cursor[path[path.length - 1]] = value;

    return writeNullable({...updated});
  }

  function updatePathString(pathString, value) {
    return updatePath(pathString.trim().split('.'), value);
  }

  function get() {
    return obj;
  }

  return {
    get,
    updatePath,
    updatePathString
  }
}
