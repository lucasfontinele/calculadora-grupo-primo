import { JSX } from 'react';

export type ButtonProps = JSX.IntrinsicElements['button'] & {
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
};
