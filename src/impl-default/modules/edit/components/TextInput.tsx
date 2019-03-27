import * as React from 'react';
import namespaceClassName from "~api/util/namespaceClassName";
import readWriter from "~api/util/ReadWriter";

interface Props {
  defaultValue?: string;
  label?: string;
  onChange(value: string): any;
  onClean?(value: string): string;
  onFormat?(value: string): string;
  onValidate?(value: string): ValidationResult;
  placeholder?: string;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  value: string;
}

interface ValidationResult {
  isValid: boolean;
  message: string;
  value: string;
}

interface State extends ValidationResult {
  lastValidValue: string;
}

const c = namespaceClassName('TextInput');

export default class TextInput extends React.Component<Props, State> {

  static defaultProps: Partial<Props> = {
    defaultValue: '',
    label: 'Text Input',
    onChange: (value: string) => {},
    onClean: (value: string) => value,
    onFormat: (value: string) => value,
    onValidate: (value: string) => ({isValid: true, message: '', value}),
    placeholder: '',
    validateOnChange: true,
    validateOnBlur: true,
    value: ''
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.value !== state.lastValidValue) {
      return readWriter(state).into('lastValidValue').write(props.value);
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      isValid: true,
      message: '',
      value: props.value || props.defaultValue || '',
      lastValidValue: props.value || props.defaultValue || ''
    }
  }

  doValidate = (e) => {
    const v = this.props.onClean(e.target.value);
    const {isValid, message, value} = this.props.onValidate(v);
    this.setState({isValid, message, value}, () => {
      if (this.state.isValid) this.setState({lastValidValue: value}, () => this.props.onChange(this.state.value));
    })
  };

  handleChange = (e) => {
    if (this.props.validateOnChange) this.doValidate(e);
  };

  handleBlur = (e) => {
    if (this.props.validateOnBlur) this.doValidate(e);
  };

  renderMessage = () => !this.state.isValid && !!this.state.message
    ? <div className={c('message')}>{this.state.message}</div>
    : null;

  render = () => {
    const formattedValue = this.props.onFormat(this.state.value);
    const formattedPlaceholder = this.props.onFormat(this.props.placeholder);

    return (
      <div className={c('root')}>
        <label className={c('label')}>{this.props.label}</label>
        <input
          className={c('input')}
          defaultValue={formattedValue}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          placeholder={formattedPlaceholder}
          value={formattedValue}
        />
        {this.renderMessage()}
      </div>
    );
  };
}
