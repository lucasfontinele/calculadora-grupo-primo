'use client';

import { Button } from '@/app/shared/components/Button/Button';
import { Grid } from '@/app/shared/components/Grid';
import {
  CurrencyTextField,
  TextField,
} from '@/app/shared/components/TextField';
import Image from 'next/image';
import { useSimulationForm } from '@/app/(features)/(calculadora)/hooks/useSimulationForm';
import { Controller } from 'react-hook-form';

export function SimulationForm() {
  const { form, isDisabled } = useSimulationForm();

  return (
    <form className="w-full py-20 max-lg:py-8">
      <Grid>
        <div className="bg-tertiary-gray w-full p-14 rounded-2xl flex flex-col gap-y-[88px] max-lg:gap-y-12 max-lg:px-6 max-lg:py-8">
          <div className="flex flex-col gap-y-[22px]">
            <h4 className="text-4xl font-sans font-semibold text-content-primary max-lg:text-xl">
              Simule agora
            </h4>
            <h6 className="text-2xl font-sans text-content-secondary max-lg:text-base">
              Faça uma comparação e comece a investir em uma experiência fácil e
              intuitiva:
            </h6>
          </div>

          <div className="flex items-end gap-x-11 max-lg:flex-col max-lg:gap-y-8">
            <Controller
              control={form.control}
              name="initialInvestment"
              render={({ field: { onChange, value } }) => (
                <CurrencyTextField
                  placeholder="R$ 0,00"
                  label="Investimento inicial"
                  name="initialInvestment"
                  onValueChange={value => onChange(value)}
                />
              )}
            />

            <Controller
              control={form.control}
              name="monthlyInvestment"
              render={({ field: { onChange, value } }) => (
                <CurrencyTextField
                  placeholder="R$ 0,00"
                  label="Investimento mensal"
                  name="monthlyInvestment"
                  onValueChange={value => onChange(value)}
                />
              )}
            />

            <Controller
              control={form.control}
              name="period"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  label="Quanto tempo deixaria seu dinheiro investido? (meses)"
                  name="period"
                  placeholder="12 meses"
                  onChange={e => {
                    const numericValue = e.target.value.replace(/\D/g, '');
                    onChange(numericValue);
                  }}
                  value={value}
                />
              )}
            />
          </div>

          <div className="w-auto flex items-end justify-end max-lg:w-full">
            <Button
              disabled={isDisabled}
              endAdornment={
                <Image
                  alt="right arrow"
                  src="/arrow_right_alt.svg"
                  width={24}
                  height={24}
                />
              }
              className="max-lg:w-full"
            >
              Calcular
            </Button>
          </div>
        </div>
      </Grid>
    </form>
  );
}
