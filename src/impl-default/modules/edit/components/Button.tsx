import * as React from 'react';
import namespaceClassName from "~api/util/namespaceClassName";

export enum ButtonStyle {
  POSITIVE = 'Positive',
  NEGATIVE = 'Negative',
  NEUTRAL = 'Neutral',
  SETTING = 'Setting'
}

interface Props {
  style: ButtonStyle;
  label: string;
  onClick(): any;
}

const defaultProps: Partial<Props> = {
  style: ButtonStyle.POSITIVE,
  label: 'Submit',
  onClick: () => {}
};

export default (props: Props) => {

  const {
    style,
    label,
    onClick
  } = {...defaultProps, ...props};

  const c = namespaceClassName(`Button${style}`);

  return (
    <button
      className={c('root')}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
