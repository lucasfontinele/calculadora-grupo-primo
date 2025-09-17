import { JSX } from 'react';

export type TextFieldProps = JSX.IntrinsicElements['input'] & {
  label?: string;
  error?: string;
};
