// A fórmula para o cálculo da rentabilidade é
// M = P . (1 + i) ^ t/252, onde M é o montante final, P é o principal, i é a taxa de rendimento e t é o prazo em dias úteis.

const ARCA_RATE = 0.18;
const SELIC_RATE = 0.0925;
const WORKING_DAYS_PER_MONTH = 21;

const calculateRentability = (
  initialInvestment: number,
  monthlyInvestment: number,
  period: number,
  rate: number,
) => {
  const totalWorkingDays = period * WORKING_DAYS_PER_MONTH;
  const term = totalWorkingDays / 252;

  const initialAmount = initialInvestment * Math.pow(1 + rate, term);

  let monthlyAmount = 0;

  for (let month = 1; month <= period; month++) {
    const remainingMonths = period - month;
    const remainingDays = remainingMonths * WORKING_DAYS_PER_MONTH;
    const remainingTerm = remainingDays / 252;
    monthlyAmount += monthlyInvestment * Math.pow(1 + rate, remainingTerm);
  }

  return initialAmount + monthlyAmount;
};

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;

  const initialInvestment = Number(params.get('initialInvestment')) || 0;
  const monthlyInvestment = Number(params.get('monthlyInvestment')) || 0;
  const period = Number(params.get('period')) || 0;

  const values = [initialInvestment, monthlyInvestment, period];

  if (values.some(v => !v)) {
    return Response.json({ error: 'Missing params' }, { status: 400 });
  }

  const arcaTotal = calculateRentability(
    initialInvestment,
    monthlyInvestment,
    period,
    ARCA_RATE,
  );

  const selicTotal = calculateRentability(
    initialInvestment,
    monthlyInvestment,
    period,
    SELIC_RATE,
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return Response.json({
    period,
    rates: {
      arca: ARCA_RATE,
      selic: SELIC_RATE,
    },
    arcaRentability: formatCurrency(arcaTotal),
    selicRentability: formatCurrency(selicTotal),
  });
}
