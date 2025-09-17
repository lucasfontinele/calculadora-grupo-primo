import { ButtonProps } from './Button.types';

export function Button({
  endAdornment,
  startAdornment,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className="hover:opacity-80 bg-background-accent text-content-primary rounded-2xl flex items-center justify-center gap-x-3 min-w-[250px] max-lg:text-lg text-2xl font-sans font-semibold cursor-pointer py-5"
      {...props}
    >
      {startAdornment}
      {children}
      {endAdornment}
    </button>
  );
}
