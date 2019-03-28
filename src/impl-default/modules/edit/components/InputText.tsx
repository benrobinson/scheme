import * as React from 'react';
import Input, {
  InputType,
  invalidResult,
  ValidationResult,
  validResult
} from "~impl-default/modules/edit/components/Input";

interface Props {
  defaultValue?: string;
  label?: string;
  name?: string;
  onChange(value: string): any;
  onClean?(value: string): string;
  onFormat?(value: string): string;
  pattern?: RegExp;
  patternMismatchMessage?: string;
  maxLength?: number;
  minLength?: number;
  value: string;
}

const defaultProps: Partial<Props> = {
  defaultValue: '',
  label: 'Text Input',
  name: '',
  onClean: (value: string) => value,
  onChange: (value: string) => {},
  onFormat: (value: string) => value,
  pattern: /.*/g,
  patternMismatchMessage: 'Value does not match required input pattern',
  maxLength: Number.MAX_SAFE_INTEGER,
  minLength: 0,
  value: ''
};

export default (props: Props) => {

  const {
    defaultValue,
    label,
    name,
    onChange,
    onClean,
    onFormat,
    pattern,
    patternMismatchMessage,
    maxLength,
    minLength,
    value } = {...defaultProps, ...props};

  function handleValidate(v: string): ValidationResult {
    const length = v.length;

    if (length < minLength || length > maxLength) return invalidResult(v, `Length must be between ${minLength} and ${maxLength}`);
    if (!pattern.test(v)) return invalidResult(v, patternMismatchMessage);

    return validResult(v);
  }

  return (
    <Input
      defaultValue={defaultValue}
      label={label}
      name={name}
      onChange={onChange}
      onClean={onClean}
      onFormat={onFormat}
      onValidate={handleValidate}
      type={InputType.TEXT}
      value={value}
    />
  );
}
