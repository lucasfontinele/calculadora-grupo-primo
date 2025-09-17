import { TextFieldProps } from './TextField.types';

export function TextField({ label, name }: TextFieldProps) {
  return (
    <div className="flex flex-col gap-y-3 w-full">
      <label className="text-content-secondary text-2xl" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="w-full border border-neutral-gray bg-white rounded-xl px-4 py-7"
      />
    </div>
  );
}
