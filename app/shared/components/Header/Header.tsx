import { Grid } from '@/app/shared/components/Grid';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/app/shared/constants/links';

export function Header() {
  return (
    <header className="flex flex-col items-center w-full border-b border-primary-gray">
      <Grid className="py-8">
        <Link href={ROUTES.HOME}>
          <Image
            src="/logo.svg"
            alt="Grupo Primo"
            width={176}
            height={32}
            className="max-md:w-[120px] max-md:h-[22px]"
          />
        </Link>
      </Grid>
    </header>
  );
}
