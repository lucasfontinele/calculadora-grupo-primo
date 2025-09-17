import { JSX } from 'react';

export type TextFieldProps = JSX.IntrinsicElements['input'] & {
  label?: string;
  error?: string;
};

export type CurrencyTextFieldProps = Omit<
  TextFieldProps,
  'onChange' | 'value'
> & {
  onValueChange?: (numericValue: number) => void;
  defaultValue?: string;
};
