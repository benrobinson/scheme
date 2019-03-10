import Schema, {Schemas} from "../../../models/Schema";
import Option from "../../../util/Option";
import ReadWriter from "../../../util/ReadWriter";

export interface RegisterController {
  getSchema(key: string): Option<Schema>;
  withSchema(key: string, schema: Schema): RegisterController;
  withSchemas(schemas: Schemas): RegisterController;
}

const registerFromConfig = (schemas: Schemas = {}): RegisterController => {
  
  function getSchema(key: string): Option<Schema> {
    return ReadWriter(schemas).into(key).readAsOpt<Schema>();
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
