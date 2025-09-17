import { Grid } from '@/app/shared/components/Grid';
import { TextField } from '@/app/shared/components/TextField';

export function SimulationForm() {
  return (
    <form className="w-full py-20">
      <Grid>
        <div className="bg-tertiary-gray w-full p-14 rounded-2xl flex flex-col gap-y-[88px]">
          <div className="flex flex-col gap-y-[22px]">
            <h4 className="text-4xl font-semibold text-content-primary">
              Simule agora
            </h4>
            <h6 className="text-2xl text-content-secondary">
              Faça uma comparação e comece a investir em uma experiência fácil e
              intuitiva:
            </h6>
          </div>

          <div className="flex items-center gap-x-11">
            <TextField label="Investimento inicial" name="initialInvestment" />
            <TextField label="Investimento mensal" name="monthlyInvestment" />
            <TextField
              label="Quanto tempo deixaria seu dinheiro investido?"
              name="period"
            />
          </div>
        </div>
      </Grid>
    </form>
  );
}
