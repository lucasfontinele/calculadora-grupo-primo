import { Grid } from '@/app/shared/components/Grid';

export function Hero() {
  return (
    <div className="w-full bg-foreground py-[120px] max-md:py-[88px]">
      <Grid className="flex flex-col gap-y-4">
        <h1 className="text-5xl font-bold text-inverse-primary max-lg:text-[26px]">
          Simulador de investimento
        </h1>
        <h3 className="text-2xl text-inverse-secondary max-lg:text-[13px]">
          Descubra o quanto você pode economizar.
        </h3>
      </Grid>
    </div>
  );
}
