import { useForm } from 'react-hook-form';
import { SimulationFormProps } from '@/app/(features)/(calculadora)/types/UseSimulationForm.types';
import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/app/shared/constants/links';

const schema = zod.object({
  initialInvestment: zod.number().min(0),
  monthlyInvestment: zod.number().min(0),
  period: zod
    .string()
    .min(1)
    .regex(/^\d+$/)
    .refine(val => parseInt(val) > 0),
});

export function useSimulationForm() {
  const router = useRouter();
  const form = useForm<SimulationFormProps>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      period: '',
    },
  });

  const isDisabled =
    !!form.formState.errors.initialInvestment ||
    !!form.formState.errors.monthlyInvestment ||
    !!form.formState.errors.period ||
    !form.formState.isValid ||
    form.watch('period') === '';

  const handleSubmit = useCallback((props: SimulationFormProps) => {
    router.push(
      `${ROUTES.RESULT}?initialInvestment=${props.initialInvestment}&monthlyInvestment=${props.monthlyInvestment}&period=${props.period}`,
    );
  }, []);

  return { form, isDisabled, handleSubmit };
}
