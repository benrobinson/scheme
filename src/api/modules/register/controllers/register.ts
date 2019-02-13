import Schema, {Schemas} from "../../../models/Schema";
import Option from "../../../util/option";
import {readNullable} from "../../../util/readNullable";

export interface RegisterController {
  getSchema(key: string): Option<Schema>;
  withSchema(key: string, schema: Schema): RegisterController;
  withSchemas(schemas: Schemas): RegisterController;
}

const registerFromConfig = (schemas: Schemas = {}): RegisterController => {
  
  function getSchema(key: string): Option<Schema> {
    return readNullable(schemas).into(key).asOpt();
  }
  
  function withSchema(key: string, schema: Schema): RegisterController {
    return registerFromConfig({...schemas, [key]: schema});
  }
  
  function withSchemas(schemas: Schemas): RegisterController {
    return registerFromConfig(schemas);
  }
  
  return {
    getSchema,
    withSchema,
    withSchemas
  }
};

export default registerFromConfig;
