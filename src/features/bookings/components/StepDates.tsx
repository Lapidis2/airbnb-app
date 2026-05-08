import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepDatesSchema, type StepDatesData } from '../schemas/booking';

interface StepDatesProps {
  onNext: (data: StepDatesData) => void;
  initialData?: Partial<StepDatesData>;
}

export default function StepDates({ onNext, initialData }: StepDatesProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<StepDatesData>({
    resolver: zodResolver(stepDatesSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onNext)}>
      <div>
        <label>Check-in Date</label>
        <input type="date" {...register('checkIn')} />
        {errors.checkIn && <p>{errors.checkIn.message}</p>}
      </div>
      <div>
        <label>Check-out Date</label>
        <input type="date" {...register('checkOut')} />
        {errors.checkOut && <p>{errors.checkOut.message}</p>}
      </div>
      <div>
        <label>Guests</label>
        <input type="number" {...register('guests', { valueAsNumber: true })} min={1} max={16} />
        {errors.guests && <p>{errors.guests.message}</p>}
      </div>
      <button
        type="submit"
        style={{
          width: '100%',
          padding: '14px',
          background: '#ff385c',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.background = '#e03150'}
        onMouseOut={(e) => e.currentTarget.style.background = '#ff385c'}
      >
        Continue →
      </button>
    </form>
  );
}