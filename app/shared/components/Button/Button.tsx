import { twMerge } from 'tailwind-merge';
import { ButtonProps } from './Button.types';

export function Button({
  endAdornment,
  startAdornment,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        'hover:opacity-80 bg-background-accent text-content-primary rounded-2xl flex items-center',
        'justify-center gap-x-3 min-w-[250px] max-lg:text-lg text-2xl font-sans font-semibold cursor-pointer py-5 disabled:cursor-not-allowed disabled:opacity-30',
        className,
      )}
      {...props}
    >
      {startAdornment}
      {children}
      {endAdornment}
    </button>
  );
}
