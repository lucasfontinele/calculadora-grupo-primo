import { Grid } from '@/app/shared/components/Grid';
import Image from 'next/image';
import { SimulationDisplayProps } from '@/app/(features)/resultado/types/SimulationDisplay.types';

export async function SimulationDisplay({
  period,
  selicRate,
  arcaRate,
  selicProfitability,
  arcaProfitability,
}: SimulationDisplayProps) {
  return (
    <div className="w-full">
      <Grid className="max-lg:px-0 max-md:px-0">
        <div className="flex flex-col gap-y-12 p-14 max-lg:gap-y-8 max-lg:px-4 max-lg:py-8 bg-tertiary-gray rounded-2xl">
          <h2 className="text-[40px] font-sans font-bold text-content-primary max-lg:text-xl">
            Resultado:
          </h2>

          <div className="flex flex-col gap-y-4 mt-10 max-lg:mt-0">
            <h4 className="font-sans font-semibold text-content-tertiary text-[32px] max-lg:text-lg">
              Em {period} {period > 1 ? 'meses' : 'mês'} você teria:
            </h4>

            <div className="bg-white rounded-3xl border-border-opaque border p-8 flex flex-col gap-y-4">
              <small className="uppercase text-base tracking-[5.12px] text-content-secondary font-semibold font-sans max-lg:text-sm">
                Taxa Selic
              </small>

              <strong className="font-semibold font-sans text-[88px] text-content-primary leading-none max-lg:text-[32px]">
                {selicProfitability}
              </strong>
            </div>

            <div className="bg-white rounded-3xl border-border-opaque border p-8 flex flex-col gap-y-4">
              <Image
                alt="Arca"
                src="/arca.svg"
                width={112}
                height={32}
                className="max-lg:max-w-[72px] max-lg:max-h-[20px]"
              />

              <small className="uppercase text-base tracking-[5.12px] text-content-secondary font-semibold font-sans max-lg:text-sm">
                Fundo Arca
              </small>

              <strong className="font-semibold font-sans text-[88px] text-content-primary leading-none max-lg:text-[32px]">
                {arcaProfitability}
              </strong>
            </div>
          </div>

          <div className="w-full border-solid border-[5px] border-background-accent rounded-3xl"></div>

          <div className="flex flex-col">
            <div className="p-4">
              <span className="flex items-center gap-x-4 uppercase text-base tracking-[5.12px] text-content-secondary font-semibold font-raleway">
                TAXA SELIC:
                <b className="text-content-primary text-2xl font-open-sans font-extrabold tracking-normal">
                  {selicRate}
                </b>
              </span>
            </div>

            <div className="p-4">
              <span className="flex items-center gap-x-4 uppercase text-base tracking-[5.12px] text-content-secondary font-semibold font-raleway max-lg:flex-col max-lg:items-start max-lg:gap-y-4">
                RENTABILIDADE DA ARCA:
                <b className="text-content-primary text-2xl font-open-sans font-extrabold tracking-normal normal-case">
                  {arcaRate}
                </b>
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-y-6">
            <div className="flex items-center gap-x-4 max-lg:items-start">
              <Image alt="Help" src="/help.svg" width={32} height={32} />

              <span className="font-sans text-lg text-content-tertiary max-lg:text-sm">
                Valores utilizados no simulador de investimentos (referentes à
                data de última atualização - esses valores podem alterar de
                acordo com o mercado):
              </span>
            </div>

            <span className="ml-10 font-sans text-lg text-content-tertiary max-lg:text-sm">
              - Data da última atualização: 10/01/2024
            </span>
          </div>
        </div>
      </Grid>
    </div>
  );
}
