'use server';

import { SimulationDisplay } from '@/app/(features)/resultado/components/SimulationDisplay/SimulationDisplay';
import { SimulationResponseDto } from '@/app/shared/types/SimulationResponseDto.types';

export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const response = await fetch(
    `http://localhost:3000/api/simulator?initialInvestment=${params.initialInvestment}&monthlyInvestment=${params.monthlyInvestment}&period=${params.period}`,
    {
      method: 'GET',
    },
  );

  const data = (await response.json()) as SimulationResponseDto;

  return (
    <div className="flex flex-col w-full py-[80px] max-lg:p-8">
      <SimulationDisplay
        period={data.period}
        selicRate={data.rates.selic}
        arcaRate={data.rates.arca}
        selicProfitability={data.selicProfitability}
        arcaProfitability={data.arcaProfitability}
      />
    </div>
  );
}
