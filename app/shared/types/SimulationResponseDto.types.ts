export type SimulationResponseDto = {
  period: number;
  rates: {
    arca: string;
    selic: string;
  };
  arcaProfitability: string;
  selicProfitability: string;
};
