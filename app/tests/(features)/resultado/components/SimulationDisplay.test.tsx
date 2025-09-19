import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SimulationDisplay } from '@/app/(features)/resultado/components/SimulationDisplay/SimulationDisplay';
import { SimulationDisplayProps } from '@/app/(features)/resultado/types/SimulationDisplay.types';

vi.mock('next/image', () => ({
  default: ({ alt, src, ...props }: any) => <img alt={alt} src={src} {...props} />,
}));

describe('SimulationDisplay Component', () => {
  const defaultProps: SimulationDisplayProps = {
    period: 12,
    selicRate: '12,75% a.a.',
    arcaRate: '130% do CDI',
    selicProfitability: 'R$ 15.250,00',
    arcaProfitability: 'R$ 18.300,00',
  };

  it('renders all main elements correctly', async () => {
    render(await SimulationDisplay(defaultProps));

    expect(screen.getByText('Resultado:')).toBeInTheDocument();
    expect(screen.getByText(/Em.*12.*meses.*teria:/)).toBeInTheDocument();
    expect(screen.getByText('Taxa Selic')).toBeInTheDocument();
    expect(screen.getByText('Fundo Arca')).toBeInTheDocument();
    expect(screen.getByText('R$ 15.250,00')).toBeInTheDocument();
    expect(screen.getByText('R$ 18.300,00')).toBeInTheDocument();
  });

  it('displays correct rates information', async () => {
    render(await SimulationDisplay(defaultProps));

    expect(screen.getByText('TAXA SELIC:')).toBeInTheDocument();
    expect(screen.getByText('12,75% a.a.')).toBeInTheDocument();
    expect(screen.getByText('RENTABILIDADE DA ARCA:')).toBeInTheDocument();
    expect(screen.getByText('130% do CDI')).toBeInTheDocument();
  });

  it('renders images with correct attributes', async () => {
    render(await SimulationDisplay(defaultProps));

    const arcaImage = screen.getByAltText('Arca');
    expect(arcaImage).toBeInTheDocument();
    expect(arcaImage).toHaveAttribute('src', '/arca.svg');
    expect(arcaImage).toHaveAttribute('width', '112');
    expect(arcaImage).toHaveAttribute('height', '32');

    const helpImage = screen.getByAltText('Help');
    expect(helpImage).toBeInTheDocument();
    expect(helpImage).toHaveAttribute('src', '/help.svg');
    expect(helpImage).toHaveAttribute('width', '32');
    expect(helpImage).toHaveAttribute('height', '32');
  });

  it('displays disclaimer information', async () => {
    render(await SimulationDisplay(defaultProps));

    expect(
      screen.getByText(/Valores utilizados no simulador de investimentos/)
    ).toBeInTheDocument();
    expect(
      screen.getByText('- Data da última atualização: 10/01/2024')
    ).toBeInTheDocument();
  });

  it('handles singular period correctly', async () => {
    const singlePeriodProps = { ...defaultProps, period: 1 };
    render(await SimulationDisplay(singlePeriodProps));

    expect(screen.getByText(/Em.*1.*mês.*teria:/)).toBeInTheDocument();
  });

  it('handles plural period correctly', async () => {
    const pluralPeriodProps = { ...defaultProps, period: 24 };
    render(await SimulationDisplay(pluralPeriodProps));

    expect(screen.getByText(/Em.*24.*meses.*teria:/)).toBeInTheDocument();
  });

  it('applies correct CSS classes to main container', async () => {
    render(await SimulationDisplay(defaultProps));

    const mainContainer = screen.getByText('Resultado:').closest('div')?.parentElement?.parentElement;
    expect(mainContainer).toHaveClass('w-full');
  });

  it('applies correct CSS classes to result heading', async () => {
    render(await SimulationDisplay(defaultProps));

    const resultHeading = screen.getByText('Resultado:');
    expect(resultHeading).toHaveClass(
      'text-[40px]',
      'font-sans',
      'font-bold',
      'text-content-primary',
      'max-lg:text-xl'
    );
  });

  it('applies correct CSS classes to period heading', async () => {
    render(await SimulationDisplay(defaultProps));

    const periodHeading = screen.getByText(/Em.*12.*meses.*teria:/);
    expect(periodHeading).toHaveClass(
      'font-sans',
      'font-semibold',
      'text-content-tertiary',
      'text-[32px]',
      'max-lg:text-lg'
    );
  });

  it('applies correct CSS classes to profitability values', async () => {
    render(await SimulationDisplay(defaultProps));

    const selicValue = screen.getByText('R$ 15.250,00');
    const arcaValue = screen.getByText('R$ 18.300,00');

    [selicValue, arcaValue].forEach(element => {
      expect(element).toHaveClass(
        'font-semibold',
        'font-sans',
        'text-[88px]',
        'text-content-primary',
        'leading-none',
        'max-lg:text-[32px]'
      );
    });
  });

  it('renders with different profitability formats', async () => {
    const customProps = {
      ...defaultProps,
      selicProfitability: 'R$ 1.000.000,50',
      arcaProfitability: 'R$ 2.500.000,75',
    };
    render(await SimulationDisplay(customProps));

    expect(screen.getByText('R$ 1.000.000,50')).toBeInTheDocument();
    expect(screen.getByText('R$ 2.500.000,75')).toBeInTheDocument();
  });

  it('renders with different rate formats', async () => {
    const customProps = {
      ...defaultProps,
      selicRate: '10,50% a.a.',
      arcaRate: '115% do CDI',
    };
    render(await SimulationDisplay(customProps));

    expect(screen.getByText('10,50% a.a.')).toBeInTheDocument();
    expect(screen.getByText('115% do CDI')).toBeInTheDocument();
  });

  it('handles zero period correctly', async () => {
    const zeroPeriodProps = { ...defaultProps, period: 0 };
    render(await SimulationDisplay(zeroPeriodProps));

    expect(screen.getByText(/Em.*0.*mês.*teria:/)).toBeInTheDocument();
  });

  it('renders selic investment card correctly', async () => {
    render(await SimulationDisplay(defaultProps));

    const selicCard = screen.getByText('Taxa Selic').closest('div');
    expect(selicCard).toHaveClass(
      'bg-white',
      'rounded-3xl',
      'border-border-opaque',
      'border',
      'p-8',
      'flex',
      'flex-col',
      'gap-y-4'
    );
  });

  it('renders arca investment card correctly', async () => {
    render(await SimulationDisplay(defaultProps));

    const arcaCard = screen.getByText('Fundo Arca').closest('div');
    expect(arcaCard).toHaveClass(
      'bg-white',
      'rounded-3xl',
      'border-border-opaque',
      'border',
      'p-8',
      'flex',
      'flex-col',
      'gap-y-4'
    );
  });

  it('renders rate information with correct styling', async () => {
    render(await SimulationDisplay(defaultProps));

    const selicRateLabel = screen.getByText('TAXA SELIC:');
    expect(selicRateLabel).toHaveClass(
      'flex',
      'items-center',
      'gap-x-4',
      'uppercase',
      'text-base',
      'tracking-[5.12px]',
      'text-content-secondary',
      'font-semibold',
      'font-raleway'
    );

    const arcaRateLabel = screen.getByText('RENTABILIDADE DA ARCA:');
    expect(arcaRateLabel).toHaveClass(
      'flex',
      'items-center',
      'gap-x-4',
      'uppercase',
      'text-base',
      'tracking-[5.12px]',
      'text-content-secondary',
      'font-semibold',
      'font-raleway',
      'max-lg:flex-col',
      'max-lg:items-start',
      'max-lg:gap-y-4'
    );
  });

  it('renders rate values with correct styling', async () => {
    render(await SimulationDisplay(defaultProps));

    const selicRateValue = screen.getByText('12,75% a.a.');
    expect(selicRateValue).toHaveClass(
      'text-content-primary',
      'text-2xl',
      'font-open-sans',
      'font-extrabold',
      'tracking-normal'
    );

    const arcaRateValue = screen.getByText('130% do CDI');
    expect(arcaRateValue).toHaveClass(
      'text-content-primary',
      'text-2xl',
      'font-open-sans',
      'font-extrabold',
      'tracking-normal',
      'normal-case'
    );
  });

  it('renders with large period numbers', async () => {
    const largePeriodProps = { ...defaultProps, period: 360 };
    render(await SimulationDisplay(largePeriodProps));

    expect(screen.getByText(/Em.*360.*meses.*teria:/)).toBeInTheDocument();
  });

  it('renders disclaimer with correct styling', async () => {
    render(await SimulationDisplay(defaultProps));

    const disclaimerText = screen.getByText(/Valores utilizados no simulador/);
    expect(disclaimerText).toHaveClass(
      'font-sans',
      'text-lg',
      'text-content-tertiary',
      'max-lg:text-sm'
    );

    const lastUpdateText = screen.getByText(/Data da última atualização/);
    expect(lastUpdateText).toHaveClass(
      'ml-10',
      'font-sans',
      'text-lg',
      'text-content-tertiary',
      'max-lg:text-sm'
    );
  });

  it('has correct semantic structure', async () => {
    render(await SimulationDisplay(defaultProps));

    const mainHeading = screen.getByRole('heading', { level: 2 });
    expect(mainHeading).toHaveTextContent('Resultado:');

    const subHeading = screen.getByRole('heading', { level: 4 });
    expect(subHeading.textContent).toMatch(/Em.*12.*meses.*teria:/);
  });

  it('renders investment labels with correct styling', async () => {
    render(await SimulationDisplay(defaultProps));

    const selicLabel = screen.getByText('Taxa Selic');
    expect(selicLabel).toHaveClass(
      'uppercase',
      'text-base',
      'tracking-[5.12px]',
      'text-content-secondary',
      'font-semibold',
      'font-sans',
      'max-lg:text-sm'
    );

    const arcaLabel = screen.getByText('Fundo Arca');
    expect(arcaLabel).toHaveClass(
      'uppercase',
      'text-base',
      'tracking-[5.12px]',
      'text-content-secondary',
      'font-semibold',
      'font-sans',
      'max-lg:text-sm'
    );
  });

  it('renders with minimal values', async () => {
    const minimalProps = {
      period: 1,
      selicRate: '0% a.a.',
      arcaRate: '0% do CDI',
      selicProfitability: 'R$ 0,00',
      arcaProfitability: 'R$ 0,00',
    };
    render(await SimulationDisplay(minimalProps));

    expect(screen.getByText(/Em.*1.*mês.*teria:/)).toBeInTheDocument();
    expect(screen.getByText('0% a.a.')).toBeInTheDocument();
    expect(screen.getByText('0% do CDI')).toBeInTheDocument();
    expect(screen.getAllByText('R$ 0,00')).toHaveLength(2);
  });

  it('displays period text correctly for various values', async () => {
    const testCases = [
      { period: 0, expected: /Em.*0.*mês.*teria:/ },
      { period: 1, expected: /Em.*1.*mês.*teria:/ },
      { period: 2, expected: /Em.*2.*meses.*teria:/ },
      { period: 12, expected: /Em.*12.*meses.*teria:/ },
      { period: 120, expected: /Em.*120.*meses.*teria:/ },
    ];

    for (const testCase of testCases) {
      const props = { ...defaultProps, period: testCase.period };
      const { unmount } = render(await SimulationDisplay(props));
      
      expect(screen.getByText(testCase.expected)).toBeInTheDocument();
      
      unmount();
    }
  });

  it('renders all required sections', async () => {
    render(await SimulationDisplay(defaultProps));

    // Check main sections exist
    expect(screen.getByText('Resultado:')).toBeInTheDocument();
    expect(screen.getByText('Taxa Selic')).toBeInTheDocument();
    expect(screen.getByText('Fundo Arca')).toBeInTheDocument();
    expect(screen.getByText('TAXA SELIC:')).toBeInTheDocument();
    expect(screen.getByText('RENTABILIDADE DA ARCA:')).toBeInTheDocument();
    
    // Check images
    expect(screen.getByAltText('Arca')).toBeInTheDocument();
    expect(screen.getByAltText('Help')).toBeInTheDocument();
  });
});