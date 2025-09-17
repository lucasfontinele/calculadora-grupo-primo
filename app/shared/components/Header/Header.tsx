import { Grid } from '@/app/shared/components/Grid';
import Image from 'next/image';

export function Header() {
  return (
    <header className="flex flex-col items-center w-full border-b border-primary-gray">
      <Grid className="py-8">
        <Image src="/logo.svg" alt="Grupo Primo" width={176} height={32} className="max-md:w-[120px] max-md:h-[22px]" />
      </Grid>
    </header>
  );
}
