import { twMerge } from 'tailwind-merge';
import { GridProps } from './Grid.types';

export function Grid({ children, ...props }: GridProps) {
  return (
    <div
      className={twMerge(
        'w-full max-2xl:max-w-[1680px] sm:max-w-[1280px] mx-auto',
        props?.className,
      )}
    >
      {children}
    </div>
  );
}
