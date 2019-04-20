export interface LoadController<T> {
  loadFile(fileName: string): {
    [key: string]: T
  };
  loadDirectory(directoryName: string): {
    [key: string]: T
  };
}
