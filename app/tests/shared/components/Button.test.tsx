import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '@/app/shared/components/Button/Button';

describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies default CSS classes', () => {
    render(<Button>Test Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'hover:opacity-80',
      'bg-background-accent',
      'text-content-primary',
      'rounded-2xl',
      'flex',
      'items-center',
      'justify-center',
      'gap-x-3',
      'min-w-[250px]',
      'max-lg:text-lg',
      'text-2xl',
      'font-sans',
      'font-semibold',
      'cursor-pointer',
      'py-5',
      'disabled:cursor-not-allowed',
      'disabled:opacity-30'
    );
  });

  it('merges custom className with default classes', () => {
    render(<Button className="custom-class bg-red-500">Test</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('bg-red-500');
    expect(button).toHaveClass('rounded-2xl');
    expect(button).toHaveClass('flex');
  });

  it('renders startAdornment correctly', () => {
    const startIcon = <span data-testid="start-icon">=Ä</span>;
    render(
      <Button startAdornment={startIcon}>
        Submit
      </Button>
    );
    
    const button = screen.getByRole('button');
    const icon = screen.getByTestId('start-icon');
    
    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(button).toContainElement(icon);
    
    // Check order: startAdornment should come before children
    expect(button.textContent).toBe('=ÄSubmit');
  });

  it('renders endAdornment correctly', () => {
    const endIcon = <span data-testid="end-icon">í</span>;
    render(
      <Button endAdornment={endIcon}>
        Next
      </Button>
    );
    
    const button = screen.getByRole('button');
    const icon = screen.getByTestId('end-icon');
    
    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(button).toContainElement(icon);
    
    // Check order: endAdornment should come after children
    expect(button.textContent).toBe('Nextí');
  });

  it('renders both startAdornment and endAdornment correctly', () => {
    const startIcon = <span data-testid="start-icon">ê</span>;
    const endIcon = <span data-testid="end-icon">í</span>;
    
    render(
      <Button startAdornment={startIcon} endAdornment={endIcon}>
        Middle
      </Button>
    );
    
    const button = screen.getByRole('button');
    const startIconElement = screen.getByTestId('start-icon');
    const endIconElement = screen.getByTestId('end-icon');
    
    expect(button).toContainElement(startIconElement);
    expect(button).toContainElement(endIconElement);
    expect(button.textContent).toBe('êMiddleí');
  });

  it('handles onClick events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles onClick events with fireEvent', () => {
    const handleClick = vi.fn();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(
      <Button onClick={handleClick} disabled>
        Disabled Button
      </Button>
    );
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('applies disabled styles when disabled', () => {
    render(<Button disabled>Disabled</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:cursor-not-allowed');
    expect(button).toHaveClass('disabled:opacity-30');
  });

  it('forwards HTML button attributes', () => {
    render(
      <Button
        type="submit"
        id="test-button"
        data-testid="custom-button"
        aria-label="Custom button"
        title="Button title"
      >
        Submit Form
      </Button>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('id', 'test-button');
    expect(button).toHaveAttribute('data-testid', 'custom-button');
    expect(button).toHaveAttribute('aria-label', 'Custom button');
    expect(button).toHaveAttribute('title', 'Button title');
  });

  it('handles form submission when type is submit', () => {
    const handleSubmit = vi.fn((e) => e.preventDefault());
    
    render(
      <form onSubmit={handleSubmit}>
        <Button type="submit">Submit</Button>
      </form>
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('renders without children (icon-only button)', () => {
    const icon = <span data-testid="icon-only">+</span>;
    
    render(<Button endAdornment={icon} aria-label="Add item" />);
    
    const button = screen.getByRole('button');
    const iconElement = screen.getByTestId('icon-only');
    
    expect(button).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
    expect(button.textContent).toBe('+');
  });

  it('handles keyboard events', async () => {
    const user = userEvent.setup();
    const handleKeyDown = vi.fn();
    
    render(
      <Button onKeyDown={handleKeyDown}>
        Keyboard Button
      </Button>
    );
    
    const button = screen.getByRole('button');
    button.focus();
    await user.keyboard('{Enter}');
    
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });

  it('supports focus and blur events', async () => {
    const user = userEvent.setup();
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    
    render(
      <Button onFocus={handleFocus} onBlur={handleBlur}>
        Focus Test
      </Button>
    );
    
    const button = screen.getByRole('button');
    
    await user.click(button);
    expect(handleFocus).toHaveBeenCalledTimes(1);
    
    await user.tab();
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('applies correct CSS classes for responsive design', () => {
    render(<Button>Responsive Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('max-lg:text-lg');
    expect(button).toHaveClass('text-2xl');
  });

  it('maintains flex layout with gap for adornments', () => {
    render(
      <Button
        startAdornment={<span>Start</span>}
        endAdornment={<span>End</span>}
      >
        Middle
      </Button>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('flex');
    expect(button).toHaveClass('items-center');
    expect(button).toHaveClass('justify-center');
    expect(button).toHaveClass('gap-x-3');
  });

  it('handles complex adornments with multiple elements', () => {
    const complexStart = (
      <div data-testid="complex-start">
        <span>Icon</span>
        <span>Text</span>
      </div>
    );
    
    const complexEnd = (
      <div data-testid="complex-end">
        <span>í</span>
      </div>
    );
    
    render(
      <Button startAdornment={complexStart} endAdornment={complexEnd}>
        Complex Button
      </Button>
    );
    
    expect(screen.getByTestId('complex-start')).toBeInTheDocument();
    expect(screen.getByTestId('complex-end')).toBeInTheDocument();
    expect(screen.getByText('Complex Button')).toBeInTheDocument();
  });

  it('overrides default classes with custom className', () => {
    render(
      <Button className="bg-red-500 text-white min-w-[100px]">
        Custom Styled
      </Button>
    );
    
    const button = screen.getByRole('button');
    // tailwind-merge should override conflicting classes
    expect(button).toHaveClass('bg-red-500');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('min-w-[100px]');
    // Non-conflicting classes should remain
    expect(button).toHaveClass('rounded-2xl');
    expect(button).toHaveClass('flex');
  });

  it('maintains accessibility with proper button role', () => {
    render(<Button>Accessible Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button.tagName).toBe('BUTTON');
  });

  it('supports tabIndex attribute', () => {
    render(<Button tabIndex={-1}>Non-focusable</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('tabIndex', '-1');
  });

  it('handles ref forwarding', () => {
    const ref = { current: null };
    
    render(<Button ref={ref}>Ref Button</Button>);
    
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('renders with empty string children', () => {
    render(<Button>{''}</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('');
  });

  it('renders with numeric children', () => {
    render(<Button>{123}</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('123');
  });

  it('renders with boolean children (should not display)', () => {
    render(<Button>{true}</Button>);
    
    const button = screen.getByRole('button');
    expect(button.textContent).toBe('');
  });

  it('handles null and undefined adornments gracefully', () => {
    render(
      <Button startAdornment={null} endAdornment={undefined}>
        No Adornments
      </Button>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('No Adornments');
  });
});