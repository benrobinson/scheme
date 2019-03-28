import * as React from 'react';
import Input, {
  InputType,
  invalidResult,
  ValidationResult,
  validResult
} from "~impl-default/modules/edit/components/Input";

interface Props {
  defaultValue?: number;
  label?: string;
  name?: string;
  onChange(value: number): any;
  maximum?: number;
  minimum?: number;
  value: number;
}

const defaultProps: Partial<Props> = {
  defaultValue: 0,
  label: 'Number Input',
  name: '',
  onChange: (value: number) => {},
  maximum: Number.MAX_SAFE_INTEGER,
  minimum: Number.MIN_SAFE_INTEGER,
  value: 0
};

export default (props: Props) => {

  const {
    defaultValue,
    label,
    name,
    onChange,
    maximum,
    minimum,
    value
  } = {...defaultProps, ...props};

  function handleChange(v: string) {
    const result = parseFloat(v);

    if (isNaN(result)) {
      onChange(0);
    } else {
      onChange(result);
    }
  }

  function handleClean(v: string): string {
    return v.replace(/[^0-9.-]*/g, '');
  }

  function handleFormat(v: string): string {
    const hasDecimal = v.indexOf('.') !== -1;
    const isNegative = v.indexOf('-') === 0;
    const [left, right] = v.split('.').map(part => part.replace(/[^0-9]*/g, ''));
    const parsedLeft = parseFloat(left);
    const resolvedLeft = isNaN(parsedLeft) ? 0 : parsedLeft;
    const formattedLeft = (isNegative ? '-' : '') +
      resolvedLeft.toLocaleString() +
      (hasDecimal ? '.' : '');
    return [formattedLeft, right].join('');
  }

  function handleValidate(v: string): ValidationResult {
    const num = parseFloat(v);

    if (num < minimum || num > maximum) return invalidResult(v, `Input must be between ${minimum} and ${maximum}`);

    return validResult(v);
  }

  return (
    <Input
      defaultValue={defaultValue.toString()}
      label={label}
      name={name}
      onChange={handleChange}
      onClean={handleClean}
      onFormat={handleFormat}
      onValidate={handleValidate}
      type={InputType.TEXT}
      value={value.toString()}
    />
  )
}
