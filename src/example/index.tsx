import * as React from 'react';
import {render} from 'react-dom';
import {Component} from 'react';

import Scheme from '~/api/scheme';
import schemeConfig from '~/example/scheme-config';
import IllustrationEditor from '~/example/modules/edit/components/IllustrationEditor';

const scheme = Scheme(schemeConfig);

const exampleSchema = {
  title: 'Resume Builder',
  type: 'object',
  properties: {
    name: {
      title: 'Your Name',
      type: 'string'
    },
    contact: {
      title: 'Contact Information',
      type: 'object',
      properties: {
        email: {
          title: 'Email Address',
          type: 'string'
        },
        phone: {
          title: 'Phone Number',
          type: 'string'
        }
      }
    },
    headline: {
      title: 'Brief summary of what you offer',
      type: 'string'
    },
    skills: {
      title: 'Skills',
      type: 'array',
      items: {
        title: 'Skill',
        type: 'string'
      }
    },
    jobs: {
      title: 'Work Experience',
      type: 'array',
      items: {
        title: 'Job',
        type: 'object',
        properties: {
          company: {
            title: 'Company',
            type: 'string'
          },
          title: {
            title: 'Job Title',
            type: 'string'
          },
          responsibilities: {
            title: 'Responsibilities/Highlights',
            type: 'array',
            items: {
              title: 'Example',
              type: 'string'
            }
          },
          dates: {
            title: 'Dates Worked',
            type: 'object',
            properties: {
              from: {
                title: 'Started',
                type: 'string'
              },
              to: {
                title: 'Ended',
                type: 'string'
              }
            }
          },
          isCurrent: {
            title: 'I still work here',
            type: 'boolean',
            default: false
          }
        }
      }
    },
    schools: {
      title: 'Education',
      type: 'array',
      items: {
        title: 'School',
        type: 'object',
        properties: {
          name: {
            title: 'School Name',
            type: 'string'
          },
          degree: {
            title: 'Degree Obtained',
            type: 'string'
          },
          dates: {
            title: 'Dates Worked',
            type: 'object',
            properties: {
              from: {
                title: 'Started',
                type: 'string'
              },
              to: {
                title: 'Ended',
                type: 'string'
              }
            }
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
