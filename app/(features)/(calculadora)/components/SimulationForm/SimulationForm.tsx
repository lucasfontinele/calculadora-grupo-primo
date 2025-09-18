'use client';

import { Button } from '@/app/shared/components/Button/Button';
import { Grid } from '@/app/shared/components/Grid';
import {
  CurrencyTextField,
  TextField,
} from '@/app/shared/components/TextField';
import Image from 'next/image';

export function SimulationForm() {
  return (
    <form className="w-full py-20">
      <Grid>
        <div className="bg-tertiary-gray w-full p-14 rounded-2xl flex flex-col gap-y-[88px]">
          <div className="flex flex-col gap-y-[22px]">
            <h4 className="text-4xl font-sans font-semibold text-content-primary">
              Simule agora
            </h4>
            <h6 className="text-2xl text-content-secondary">
              Faça uma comparação e comece a investir em uma experiência fácil e
              intuitiva:
            </h6>
          </div>

          <div className="flex items-end gap-x-11">
            <CurrencyTextField
              placeholder="R$ 0,00"
              label="Investimento inicial"
              name="initialInvestment"
            />
            <CurrencyTextField
              placeholder="R$ 0,00"
              label="Investimento mensal"
              name="monthlyInvestment"
            />
            <TextField
              label="Quanto tempo deixaria seu dinheiro investido? (meses)"
              name="period"
              placeholder="12 meses"
              type="number"
            />
          </div>

          <div className="w-auto flex items-end justify-end">
            <Button
              endAdornment={
                <Image
                  alt="right arrow"
                  src="/arrow_right_alt.svg"
                  width={24}
                  height={24}
                />
              }
            >
              Calcular
            </Button>
          </div>
        </div>
      </Grid>
    </form>
  );
}
