import { useBooking } from '../hooks/useBooking';
import StepDates from './StepDates';
import StepPersonal from './StepPersonal';
import StepPayment from './StepPayment';
import StepConfirmation from './StepConfirmation';
import type { StepDatesData, StepPersonalData, StepPaymentData } from '../schemas/booking';

interface BookingFormProps {
  listingId: number;
  onClose: () => void;
}

export default function BookingForm({ listingId, onClose }: BookingFormProps) {
  const { currentStep, bookingData, next, back } = useBooking();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepDates key={0} onNext={(data: StepDatesData) => next(data)} initialData={bookingData} />;
      case 1:
        return <StepPersonal key={1} onNext={(data: StepPersonalData) => next(data)} onBack={back} initialData={bookingData} />;
      case 2:
        return <StepPayment key={2} onNext={(data: StepPaymentData) => next(data)} onBack={back} initialData={bookingData} />;
      case 3:
        return <StepConfirmation key={3} bookingData={bookingData as any} listingId={listingId} onBack={back} />;
      default:
        return <StepDates key={0} onNext={(data: StepDatesData) => next(data)} initialData={bookingData} />;
    }
  };

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal-content">
        <div className="step-indicators">
          {[0, 1, 2, 3].map((step) => (
            <div key={step} className={step <= currentStep ? 'active' : ''}></div>
          ))}
        </div>
        {renderStep()}
        <button onClick={onClose}>×</button>
      </div>
    </div>
  );
}