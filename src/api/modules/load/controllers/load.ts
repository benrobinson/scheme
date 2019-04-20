import {LoadController} from "~api/modules/load/models/LoadController";

export default <T>(): LoadController<T> => {

  function loadFile(fileName: string) {
    const keyName = fileName.split('/').slice(-1).join('').split('.').slice(0, 1);
    
  }

};
