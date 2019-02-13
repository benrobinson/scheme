import Editor, {Editors} from "./modules/edit/models/Editor";
import {FunctionComponent, LazyComponent} from "./util/lazyComponent";
import Schema, {Schemas} from "./models/Schema";
import Option, {none, some} from "./util/option";
import {EditController} from "./modules/edit/controllers/edit";
import {RegisterController} from "./modules/register/controllers/register";
import Generator from "./modules/generate/models/Generator";
import Validator from "./modules/validate/models/Validator";

interface SchemeApiConfig<Component extends FunctionComponent> {
  editor: EditController<Component>;
  generator: Generator<any>;
  getSchema(key: string): Option<Schema>;
  validator: Validator<any>;
}

function schemeApiConfig<Component extends FunctionComponent>(
  editor: EditController<Component>,
  register: RegisterController,
  validator: Validator<any>,
  generator: Generator<any>): SchemeApiConfig<Component> {

  function getSchema(key: string): Option<Schema> {
    return register.getSchema(key);
  }

  return {
    editor,
    generator,
    getSchema,
    validator
  };
}

interface SchemeApi<Component extends FunctionComponent> {
  editWithSchema(value: any, schemaKey: string): Option<LazyComponent<Component>>;
  generateFromSchema(schemaKey: string): Option<any>;
  validateWithSchema(value: any, schemaKey: string): boolean;
}

function schemeApi<Component extends FunctionComponent>(config: SchemeApiConfig<Component>): SchemeApi<Component> {

  function editWithSchema(value: any, schemaKey: string): Option<LazyComponent<Component>> {
    if (!validateWithSchema(value, schemaKey)) {
      console.error('Could not edit', value, 'because it was invalid for schema', schemaKey);
      return none();
    }

    return some(config.editor.edit(value, config.getSchema(schemaKey).getOrElse({type: null})));
  }

  function generateFromSchema(schemaKey: string): Option<any> {
    const schema = config.getSchema(schemaKey);

    return schema.map(s => config.generator(s));
  }

  function validateWithSchema(value: any, schemaKey: string): boolean {
    const schema = config.getSchema(schemaKey);

    if (schema.isNone) {
      console.error('Schema', schemaKey, 'does not exist.');
      return false;
    }

    return config.validator(value, schema.value);
  }

  return {
    editWithSchema,
    generateFromSchema,
    validateWithSchema
  };
}
