import { useState } from 'react';
import type { StepDatesData, StepPersonalData, StepPaymentData } from '../schemas/booking';

type BookingData = StepDatesData & StepPersonalData & StepPaymentData;

export function useBooking() {
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingData, setBookingData] = useState<Partial<BookingData>>({});

  const next = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => prev + 1);
  };

  const back = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const submit = (listingId: number) => {
    // This would call the API, but for now just log
    console.log('Submitting booking', { ...bookingData, listingId });
  };

  return { currentStep, bookingData, next, back, submit };
}