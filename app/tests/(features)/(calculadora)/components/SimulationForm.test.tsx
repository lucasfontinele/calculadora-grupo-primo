import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useRouter } from 'next/navigation';
import { SimulationForm } from '@/app/(features)/(calculadora)/components/SimulationForm/SimulationForm';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('next/image', () => ({
  default: ({ alt, ...props }: any) => <img alt={alt} {...props} />,
}));

describe('SimulationForm Component', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({
      push: mockPush,
    });
  });

  it('renders all form elements correctly', () => {
    render(<SimulationForm />);

    expect(screen.getByText('Simule agora')).toBeInTheDocument();
    expect(
      screen.getByText(/comparação e comece a investir/i)
    ).toBeInTheDocument();

    expect(screen.getByLabelText('Investimento inicial')).toBeInTheDocument();
    expect(screen.getByLabelText('Investimento mensal')).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Quanto tempo deixaria seu dinheiro investido/i)
    ).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /calcular/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when all fields are valid', async () => {
    const user = userEvent.setup();
    render(<SimulationForm />);

    const initialInvestmentInput = screen.getByLabelText('Investimento inicial');
    const monthlyInvestmentInput = screen.getByLabelText('Investimento mensal');
    const periodInput = screen.getByLabelText(
      /Quanto tempo deixaria seu dinheiro investido/i
    );
    const submitButton = screen.getByRole('button', { name: /calcular/i });

    await user.type(initialInvestmentInput, '1000');
    await user.type(monthlyInvestmentInput, '500');
    await user.type(periodInput, '12');

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('keeps submit button disabled when period is empty', async () => {
    const user = userEvent.setup();
    render(<SimulationForm />);

    const initialInvestmentInput = screen.getByLabelText('Investimento inicial');
    const monthlyInvestmentInput = screen.getByLabelText('Investimento mensal');
    const submitButton = screen.getByRole('button', { name: /calcular/i });

    await user.type(initialInvestmentInput, '1000');
    await user.type(monthlyInvestmentInput, '500');

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it('keeps submit button disabled when period is zero', async () => {
    const user = userEvent.setup();
    render(<SimulationForm />);

    const initialInvestmentInput = screen.getByLabelText('Investimento inicial');
    const monthlyInvestmentInput = screen.getByLabelText('Investimento mensal');
    const periodInput = screen.getByLabelText(
      /Quanto tempo deixaria seu dinheiro investido/i
    );
    const submitButton = screen.getByRole('button', { name: /calcular/i });

    await user.type(initialInvestmentInput, '1000');
    await user.type(monthlyInvestmentInput, '500');
    await user.type(periodInput, '0');

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it('filters non-numeric characters from period input', async () => {
    const user = userEvent.setup();
    render(<SimulationForm />);

    const periodInput = screen.getByLabelText(
      /Quanto tempo deixaria seu dinheiro investido/i
    ) as HTMLInputElement;

    await user.type(periodInput, 'abc123def456');

    expect(periodInput.value).toBe('123456');
  });

  it('navigates to result page with correct parameters on form submission', async () => {
    const user = userEvent.setup();
    render(<SimulationForm />);

    const initialInvestmentInput = screen.getByLabelText('Investimento inicial');
    const monthlyInvestmentInput = screen.getByLabelText('Investimento mensal');
    const periodInput = screen.getByLabelText(
      /Quanto tempo deixaria seu dinheiro investido/i
    );
    const submitButton = screen.getByRole('button', { name: /calcular/i });

    await user.type(initialInvestmentInput, '1000');
    await user.type(monthlyInvestmentInput, '500');
    await user.type(periodInput, '12');

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(
        '/resultado?initialInvestment=10&monthlyInvestment=5&period=12'
      );
    });
  });

  it('handles form submission with zero initial investment', async () => {
    const user = userEvent.setup();
    render(<SimulationForm />);

    const initialInvestmentInput = screen.getByLabelText('Investimento inicial');
    const monthlyInvestmentInput = screen.getByLabelText('Investimento mensal');
    const periodInput = screen.getByLabelText(
      /Quanto tempo deixaria seu dinheiro investido/i
    );
    const submitButton = screen.getByRole('button', { name: /calcular/i });

    await user.type(initialInvestmentInput, '0');
    await user.type(monthlyInvestmentInput, '500');
    await user.type(periodInput, '12');

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(
        '/resultado?initialInvestment=0&monthlyInvestment=5&period=12'
      );
    });
  });

  it('handles form submission with zero monthly investment', async () => {
    const user = userEvent.setup();
    render(<SimulationForm />);

    const initialInvestmentInput = screen.getByLabelText('Investimento inicial');
    const monthlyInvestmentInput = screen.getByLabelText('Investimento mensal');
    const periodInput = screen.getByLabelText(
      /Quanto tempo deixaria seu dinheiro investido/i
    );
    const submitButton = screen.getByRole('button', { name: /calcular/i });

    await user.type(initialInvestmentInput, '1000');
    await user.type(monthlyInvestmentInput, '0');
    await user.type(periodInput, '12');

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(
        '/resultado?initialInvestment=10&monthlyInvestment=0&period=12'
      );
    });
  });

  it('displays correct placeholders for input fields', () => {
    render(<SimulationForm />);

    const currencyInputs = screen.getAllByPlaceholderText('R$ 0,00');
    const periodInput = screen.getByPlaceholderText('12 meses');

    expect(currencyInputs).toHaveLength(2);
    expect(currencyInputs[0]).toBeInTheDocument();
    expect(currencyInputs[1]).toBeInTheDocument();
    expect(periodInput).toBeInTheDocument();
  });

  it('renders submit button with arrow icon', () => {
    render(<SimulationForm />);

    const arrowIcon = screen.getByAltText('right arrow');
    expect(arrowIcon).toBeInTheDocument();
    expect(arrowIcon).toHaveAttribute('src', '/arrow_right_alt.svg');
    expect(arrowIcon).toHaveAttribute('width', '24');
    expect(arrowIcon).toHaveAttribute('height', '24');
  });

  it('has correct form structure and accessibility', () => {
    render(<SimulationForm />);

    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();

    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(2);
    expect(headings[0]).toHaveTextContent('Simule agora');
    expect(headings[1]).toHaveTextContent(/comparação e comece a investir/i);
  });

  it('applies correct CSS classes to main container', () => {
    render(<SimulationForm />);

    const form = document.querySelector('form');
    expect(form).toHaveClass('w-full', 'py-20', 'max-lg:py-8');
  });

  it('prevents form submission when period contains only spaces', async () => {
    const user = userEvent.setup();
    render(<SimulationForm />);

    const initialInvestmentInput = screen.getByLabelText('Investimento inicial');
    const monthlyInvestmentInput = screen.getByLabelText('Investimento mensal');
    const periodInput = screen.getByLabelText(
      /Quanto tempo deixaria seu dinheiro investido/i
    );
    const submitButton = screen.getByRole('button', { name: /calcular/i });

    await user.type(initialInvestmentInput, '1000');
    await user.type(monthlyInvestmentInput, '500');
    await user.type(periodInput, '   ');

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it('handles large numbers correctly', async () => {
    const user = userEvent.setup();
    render(<SimulationForm />);

    const initialInvestmentInput = screen.getByLabelText('Investimento inicial');
    const monthlyInvestmentInput = screen.getByLabelText('Investimento mensal');
    const periodInput = screen.getByLabelText(
      /Quanto tempo deixaria seu dinheiro investido/i
    );
    const submitButton = screen.getByRole('button', { name: /calcular/i });

    await user.type(initialInvestmentInput, '100000');
    await user.type(monthlyInvestmentInput, '50000');
    await user.type(periodInput, '360');

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(
        '/resultado?initialInvestment=1000&monthlyInvestment=500&period=360'
      );
    });
  });
});