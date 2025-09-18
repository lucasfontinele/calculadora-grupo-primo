import { Hero } from './components/Hero';
import { SimulationForm } from './components/SimulationForm';

function CalculatorPage() {
  return (
    <div className="flex flex-col h-screen w-full">
      <Hero />

      <SimulationForm />
    </div>
  );
}

export default CalculatorPage;
