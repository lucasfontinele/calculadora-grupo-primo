import { useState, useCallback } from 'react';
import { formatCurrency } from '@/app/shared/utils/formatCurrency';

export function useCurrencyInput(initialValue: string = '') {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const formattedValue = formatCurrency(inputValue);
      setValue(formattedValue);
    },
    [formatCurrency],
  );

  const getNumericValue = useCallback((): number => {
    const numericString = value.replace(/[^\d]/g, '');
    return numericString ? parseInt(numericString, 10) / 100 : 0;
  }, [value]);

  return {
    value,
    onChange: handleChange,
    getNumericValue,
    setValue: (newValue: string) => setValue(formatCurrency(newValue)),
  };
}
