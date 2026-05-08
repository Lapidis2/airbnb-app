import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepPaymentSchema, type StepPaymentData } from '../schemas/booking';

interface StepPaymentProps {
  onNext: (data: StepPaymentData) => void;
  onBack: () => void;
  initialData?: Partial<StepPaymentData>;
}

export default function StepPayment({ onNext, onBack, initialData }: StepPaymentProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<StepPaymentData>({
    resolver: zodResolver(stepPaymentSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onNext)}>
      <div>
        <label>Card Number</label>
        <input {...register('card')} placeholder="1234567890123456" />
        {errors.card && <p>{errors.card.message}</p>}
      </div>
      <div>
        <label>Expiry (MM/YY)</label>
        <input {...register('expiry')} placeholder="12/25" />
        {errors.expiry && <p>{errors.expiry.message}</p>}
      </div>
      <div>
        <label>CVV</label>
        <input {...register('cvv')} placeholder="123" />
        {errors.cvv && <p>{errors.cvv.message}</p>}
      </div>
      <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            flex: 1,
            padding: '12px 20px',
            background: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#5a6268'}
          onMouseOut={(e) => e.currentTarget.style.background = '#6c757d'}
        >
          ← Back
        </button>
        <button
          type="submit"
          style={{
            flex: 1,
            padding: '12px 20px',
            background: '#ff385c',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#e03150'}
          onMouseOut={(e) => e.currentTarget.style.background = '#ff385c'}
        >
          Continue →
        </button>
      </div>
    </form>
  );
}