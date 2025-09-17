import { TextFieldProps } from './TextField.types';

export function TextField({ label, name, ...props }: TextFieldProps) {
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
        className="w-full border border-neutral-gray bg-white rounded-xl px-4 py-7 font-sans text-lg placeholder:text-secondary-gray text-content-primary"
        {...props}
      />
    </div>
  );
}
