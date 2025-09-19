import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Hero } from '@/app/(features)/(calculadora)/components/Hero/Hero';

describe('Hero Component', () => {
  it('renders the main heading with correct text', () => {
    render(<Hero />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Simulador de investimento');
  });

  it('renders the subtitle with correct text', () => {
    render(<Hero />);

    const subtitle = screen.getByRole('heading', { level: 3 });
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveTextContent(
      'Descubra o quanto você pode economizar.',
    );
  });

  it('applies correct CSS classes to the main container', () => {
    render(<Hero />);

    const container = screen
      .getByRole('heading', { level: 1 })
      .closest('div')?.parentElement;
    expect(container).toHaveClass(
      'w-full',
      'bg-foreground',
      'py-[120px]',
      'max-md:py-[88px]',
    );
  });

  it('applies correct CSS classes to the main heading', () => {
    render(<Hero />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass(
      'text-5xl',
      'font-bold',
      'text-inverse-primary',
      'max-lg:text-[26px]',
    );
  });

  it('applies correct CSS classes to the subtitle', () => {
    render(<Hero />);

    const subtitle = screen.getByRole('heading', { level: 3 });
    expect(subtitle).toHaveClass(
      'text-2xl',
      'text-inverse-secondary',
      'max-lg:text-[13px]',
    );
  });

  it('renders the Grid component with correct className', () => {
    render(<Hero />);

    const gridContainer = screen.getByRole('heading', {
      level: 1,
    }).parentElement;
    expect(gridContainer).toHaveClass('flex', 'flex-col', 'gap-y-4');
  });

  it('has correct semantic structure', () => {
    render(<Hero />);

    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(2);

    const h1 = screen.getByRole('heading', { level: 1 });
    const h3 = screen.getByRole('heading', { level: 3 });

    expect(h1).toBeInTheDocument();
    expect(h3).toBeInTheDocument();
  });
});
