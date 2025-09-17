export const formatCurrency = (inputValue: string): string => {
  const numericValue = inputValue.replace(/[^\d]/g, '');

  if (!numericValue) return '';

  const numberValue = parseInt(numericValue, 10) / 100;

  return numberValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
