import { Grid } from '@/app/shared/components/Grid';
import Image from 'next/image';

export function Header() {
  return (
    <header className="flex flex-col items-center">
      <Grid className="py-8">
        <Image src="/logo.svg" alt="Grupo Primo" width={176} height={32} />
      </Grid>
    </header>
  );
}
