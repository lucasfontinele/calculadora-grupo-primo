import { useCurrencyInput } from '@/app/shared/hooks/useCurrencyInput';
import { CurrencyTextFieldProps } from './TextField.types';

export function CurrencyTextField({
  label,
  name,
  onValueChange,
  defaultValue = '',
  ...props
}: CurrencyTextFieldProps) {
  const { value, onChange, getNumericValue } = useCurrencyInput(defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    if (onValueChange) {
      setTimeout(() => {
        onValueChange(getNumericValue());
      }, 0);
    }
  };

  return (
    <div className="flex flex-col gap-y-3 w-full font-sans">
      <label
        className="text-content-secondary font-sans text-xl"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className="w-full border border-neutral-gray bg-white rounded-xl px-4 py-7 font-sans text-lg placeholder:text-secondary-gray text-content-primary"
        {...props}
      />
    </div>
  );
}
