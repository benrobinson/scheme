import * as React from 'react';
import {render} from 'react-dom';
import Scheme, {schemeConfigDefault} from '../api/Scheme';
import {Component, FunctionComponent} from "react";

const scheme = Scheme(schemeConfigDefault());

const exampleSchema = {
  type: 'object',
  properties: {
    foo: {
      type: 'string',
      default: 'Eggs'
    },
    bar: {
      type: 'number',
      default: 3
    },
    baz: {
      type: 'boolean',
      default: false
    },
    qux: {
      type: 'array',
      default: [],
      items: {
        type: 'string'
      }
    }
  }
};

const root = document.getElementById('root');
const Edit = scheme.edit(scheme.generate(exampleSchema), exampleSchema);

class Wrapper extends Component<any, any> {

  constructor(props) {
    super(props);

    this.state = {
      value: scheme.generate(exampleSchema)
    }
  }

  handleUpdate = (value) => {
    this.setState({value});
  };

  render = () =>
    <Edit onUpdate={this.handleUpdate} value={this.state.value} />
}


render(
  <Wrapper />,
  root
);
