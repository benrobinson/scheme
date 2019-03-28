import * as React from 'react';
import {render} from 'react-dom';
import {Component} from 'react';

import Scheme from '~/api/scheme';
import schemeConfig from '~/example/scheme-config';
import IllustrationEditor from '~/example/modules/edit/components/IllustrationEditor';

const scheme = Scheme(schemeConfig);

const exampleSchema = {
  title: 'Lots o\' objects',
  type: 'array',
  items: {
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
      },
      illustration: {
        type: 'object',
        editor: 'IllustrationEditor',
        properties: {
          link: {
            type: 'string'
          },
          type: {
            type: 'string',
            enum: ['image', 'video']
          }
        }
      }
    }
  }
};

const root = document.getElementById('root');
const Edit = scheme.edit;

class Wrapper extends Component<any, any> {

  constructor(props) {
    super(props);

    this.state = {
      value: scheme.generate(exampleSchema)
    }
  }

  handleUpdate = (value) => {
    console.log(value);
    this.setState({value});
  };

  render = () =>
    <Edit
      value={this.state.value}
      onUpdate={this.handleUpdate}
      schema={exampleSchema}
    />
}


render(
  <Wrapper />,
  root
);
