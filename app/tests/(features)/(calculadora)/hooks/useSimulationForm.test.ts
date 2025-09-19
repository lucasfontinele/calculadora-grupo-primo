import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useRouter } from 'next/navigation';
import { useSimulationForm } from '@/app/(features)/(calculadora)/hooks/useSimulationForm';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('useSimulationForm Hook', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({
      push: mockPush,
    });
  });

  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useSimulationForm());

    expect(result.current.form.getValues()).toEqual({
      period: '',
      initialInvestment: undefined,
      monthlyInvestment: undefined,
    });
  });

  it('has form disabled initially', () => {
    const { result } = renderHook(() => useSimulationForm());

    expect(result.current.isDisabled).toBe(true);
  });

  it('enables form when all required fields are valid', async () => {
    const { result } = renderHook(() => useSimulationForm());

    await act(async () => {
      result.current.form.setValue('initialInvestment', 1000, { shouldValidate: true });
      result.current.form.setValue('monthlyInvestment', 500, { shouldValidate: true });
      result.current.form.setValue('period', '12', { shouldValidate: true });
    });

    await waitFor(() => {
      expect(result.current.isDisabled).toBe(false);
    });
  });

  it('keeps form disabled when period is empty', async () => {
    const { result } = renderHook(() => useSimulationForm());

    await act(async () => {
      result.current.form.setValue('initialInvestment', 1000, { shouldValidate: true });
      result.current.form.setValue('monthlyInvestment', 500, { shouldValidate: true });
      result.current.form.setValue('period', '', { shouldValidate: true });
    });

    await waitFor(() => {
      expect(result.current.isDisabled).toBe(true);
    });
  });

  it('validates initialInvestment must be non-negative', async () => {
    const { result } = renderHook(() => useSimulationForm());

    await act(async () => {
      result.current.form.setValue('initialInvestment', -100, { shouldValidate: true });
      result.current.form.setValue('monthlyInvestment', 500, { shouldValidate: true });
      result.current.form.setValue('period', '12', { shouldValidate: true });
    });

    await waitFor(() => {
      expect(result.current.form.formState.errors.initialInvestment).toBeDefined();
      expect(result.current.isDisabled).toBe(true);
    });
  });

  it('validates monthlyInvestment must be non-negative', async () => {
    const { result } = renderHook(() => useSimulationForm());

    await act(async () => {
      result.current.form.setValue('initialInvestment', 1000, { shouldValidate: true });
      result.current.form.setValue('monthlyInvestment', -200, { shouldValidate: true });
      result.current.form.setValue('period', '12', { shouldValidate: true });
    });

    await waitFor(() => {
      expect(result.current.form.formState.errors.monthlyInvestment).toBeDefined();
      expect(result.current.isDisabled).toBe(true);
    });
  });

  it('validates period must be a positive number string', async () => {
    const { result } = renderHook(() => useSimulationForm());

    await act(async () => {
      result.current.form.setValue('initialInvestment', 1000, { shouldValidate: true });
      result.current.form.setValue('monthlyInvestment', 500, { shouldValidate: true });
      result.current.form.setValue('period', '0', { shouldValidate: true });
    });

    await waitFor(() => {
      expect(result.current.form.formState.errors.period).toBeDefined();
      expect(result.current.isDisabled).toBe(true);
    });
  });

  it('validates period must contain only digits', async () => {
    const { result } = renderHook(() => useSimulationForm());

    await act(async () => {
      result.current.form.setValue('initialInvestment', 1000, { shouldValidate: true });
      result.current.form.setValue('monthlyInvestment', 500, { shouldValidate: true });
      result.current.form.setValue('period', '12a', { shouldValidate: true });
    });

    await waitFor(() => {
      expect(result.current.form.formState.errors.period).toBeDefined();
      expect(result.current.isDisabled).toBe(true);
    });
  });

  it('validates period cannot be empty string', async () => {
    const { result } = renderHook(() => useSimulationForm());

    await act(async () => {
      result.current.form.setValue('initialInvestment', 1000, { shouldValidate: true });
      result.current.form.setValue('monthlyInvestment', 500, { shouldValidate: true });
      result.current.form.setValue('period', '', { shouldValidate: true });
    });

    await waitFor(() => {
      expect(result.current.isDisabled).toBe(true);
    });
  });

  it('allows zero values for investment amounts', async () => {
    const { result } = renderHook(() => useSimulationForm());

    await act(async () => {
      result.current.form.setValue('initialInvestment', 0, { shouldValidate: true });
      result.current.form.setValue('monthlyInvestment', 0, { shouldValidate: true });
      result.current.form.setValue('period', '12', { shouldValidate: true });
    });

    await waitFor(() => {
      expect(result.current.form.formState.errors.initialInvestment).toBeUndefined();
      expect(result.current.form.formState.errors.monthlyInvestment).toBeUndefined();
      expect(result.current.isDisabled).toBe(false);
    });
  });

  it('handles form submission correctly', async () => {
    const { result } = renderHook(() => useSimulationForm());

    const formData = {
      initialInvestment: 1000,
      monthlyInvestment: 500,
      period: '12',
    };

    await act(async () => {
      result.current.handleSubmit(formData);
    });

    expect(mockPush).toHaveBeenCalledWith(
      '/resultado?initialInvestment=1000&monthlyInvestment=500&period=12'
    );
  });

  it('handles form submission with zero values', async () => {
    const { result } = renderHook(() => useSimulationForm());

    const formData = {
      initialInvestment: 0,
      monthlyInvestment: 0,
      period: '6',
    };

    await act(async () => {
      result.current.handleSubmit(formData);
    });

    expect(mockPush).toHaveBeenCalledWith(
      '/resultado?initialInvestment=0&monthlyInvestment=0&period=6'
    );
  });

  it('handles form submission with large numbers', async () => {
    const { result } = renderHook(() => useSimulationForm());

    const formData = {
      initialInvestment: 1000000,
      monthlyInvestment: 50000,
      period: '360',
    };

    await act(async () => {
      result.current.handleSubmit(formData);
    });

    expect(mockPush).toHaveBeenCalledWith(
      '/resultado?initialInvestment=1000000&monthlyInvestment=50000&period=360'
    );
  });

  it('updates form state when values change', async () => {
    const { result } = renderHook(() => useSimulationForm());

    await act(async () => {
      result.current.form.setValue('period', '24');
    });

    expect(result.current.form.watch('period')).toBe('24');
  });

  it('maintains stable handleSubmit reference', () => {
    const { result, rerender } = renderHook(() => useSimulationForm());

    const firstHandleSubmit = result.current.handleSubmit;
    
    rerender();
    
    const secondHandleSubmit = result.current.handleSubmit;
    
    expect(firstHandleSubmit).toBe(secondHandleSubmit);
  });

  it('disables form when there are validation errors', async () => {
    const { result } = renderHook(() => useSimulationForm());

    await act(async () => {
      result.current.form.setValue('initialInvestment', -100, { shouldValidate: true });
      result.current.form.setValue('monthlyInvestment', 500, { shouldValidate: true });
      result.current.form.setValue('period', '12', { shouldValidate: true });
    });

    await waitFor(() => {
      expect(result.current.form.formState.errors.initialInvestment).toBeDefined();
      expect(result.current.isDisabled).toBe(true);
    });
  });

  it('validates complex period scenarios', async () => {
    const { result } = renderHook(() => useSimulationForm());

    // Test with decimal numbers
    await act(async () => {
      result.current.form.setValue('initialInvestment', 1000, { shouldValidate: true });
      result.current.form.setValue('monthlyInvestment', 500, { shouldValidate: true });
      result.current.form.setValue('period', '12.5', { shouldValidate: true });
    });

    await waitFor(() => {
      expect(result.current.form.formState.errors.period).toBeDefined();
      expect(result.current.isDisabled).toBe(true);
    });

    // Test with negative numbers as string
    await act(async () => {
      result.current.form.setValue('period', '-12', { shouldValidate: true });
    });

    await waitFor(() => {
      expect(result.current.form.formState.errors.period).toBeDefined();
      expect(result.current.isDisabled).toBe(true);
    });
  });

  it('period validation works with various invalid inputs', async () => {
    const { result } = renderHook(() => useSimulationForm());

    await act(async () => {
      result.current.form.setValue('initialInvestment', 1000, { shouldValidate: true });
      result.current.form.setValue('monthlyInvestment', 500, { shouldValidate: true });
    });

    // Test with letters
    await act(async () => {
      result.current.form.setValue('period', 'abc', { shouldValidate: true });
    });

    await waitFor(() => {
      expect(result.current.form.formState.errors.period).toBeDefined();
      expect(result.current.isDisabled).toBe(true);
    });

    // Test with mixed alphanumeric
    await act(async () => {
      result.current.form.setValue('period', '12abc', { shouldValidate: true });
    });

    await waitFor(() => {
      expect(result.current.form.formState.errors.period).toBeDefined();
      expect(result.current.isDisabled).toBe(true);
    });
  });

  it('enables form only when all conditions are met', async () => {
    const { result } = renderHook(() => useSimulationForm());

    await act(async () => {
      result.current.form.setValue('initialInvestment', 1000, { shouldValidate: true });
      result.current.form.setValue('monthlyInvestment', 500, { shouldValidate: true });
      result.current.form.setValue('period', '12', { shouldValidate: true });
    });

    await waitFor(() => {
      expect(result.current.form.formState.errors.initialInvestment).toBeUndefined();
      expect(result.current.form.formState.errors.monthlyInvestment).toBeUndefined();
      expect(result.current.form.formState.errors.period).toBeUndefined();
      expect(result.current.form.watch('period')).not.toBe('');
      expect(result.current.isDisabled).toBe(false);
    });
  });

  it('works correctly with undefined investment values initially', async () => {
    const { result } = renderHook(() => useSimulationForm());

    // Initially undefined values should not cause validation errors
    expect(result.current.form.formState.errors.initialInvestment).toBeUndefined();
    expect(result.current.form.formState.errors.monthlyInvestment).toBeUndefined();
    
    // But form should still be disabled due to empty period
    expect(result.current.isDisabled).toBe(true);
  });
});