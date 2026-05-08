import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { StepDatesData, StepPersonalData, StepPaymentData } from '../schemas/booking';

interface StepConfirmationProps {
  bookingData: StepDatesData & StepPersonalData & StepPaymentData;
  listingId: number;
  onBack: () => void;
}

export default function StepConfirmation({ bookingData, listingId, onBack }: StepConfirmationProps) {
  const mutation = useMutation({
    mutationFn: async (data: typeof bookingData & { listingId: number }) => {
      // Simulate API call
      console.log('📡 Simulating booking submission', data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    },
    onSuccess: () => {
      toast.success('Booking confirmed! welcome to your new home!', {
        duration: 5000,
        position: 'top-center',
      });
    },
  });

  const handleSubmit = () => {
    mutation.mutate({ ...bookingData, listingId });
  };

  return (
    <div>
      <h3>Confirm Your Booking</h3>
      <div style={{
        margin: '20px 0',
        padding: '20px',
        background: '#f8f9fa',
        borderRadius: '12px',
        border: '1px solid #e9ecef'
      }}>
        <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>Booking Summary</h4>
        <div style={{ display: 'grid', gap: '8px' }}>
          <p><strong>📅 Check-in:</strong> {bookingData.checkIn}</p>
          <p><strong>📅 Check-out:</strong> {bookingData.checkOut}</p>
          <p><strong>👥 Guests:</strong> {bookingData.guests}</p>
          <p><strong>👤 Name:</strong> {bookingData.name}</p>
          <p><strong>📧 Email:</strong> {bookingData.email}</p>
          <p><strong>📞 Phone:</strong> {bookingData.phone}</p>
          <p><strong>💳 Card:</strong> **** **** **** {bookingData.card.slice(-4)}</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'space-between', marginTop: '20px' }}>
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
          onClick={handleSubmit}
          disabled={mutation.isPending}
          style={{
            flex: 2,
            padding: '12px 20px',
            background: mutation.isPending ? '#ccc' : '#ff385c',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: mutation.isPending ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => {
            if (!mutation.isPending) e.currentTarget.style.background = '#e03150'
          }}
          onMouseOut={(e) => {
            if (!mutation.isPending) e.currentTarget.style.background = '#ff385c'
          }}
        >
          {mutation.isPending ? '🔄 Confirming...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  );
}