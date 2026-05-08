import { z } from 'zod';

// Step 1: Dates
export const stepDatesSchema = z.object({
  checkIn: z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
  guests: z.number().min(1, 'At least 1 guest').max(16, 'Maximum 16 guests'),
}).refine((data) => new Date(data.checkOut) > new Date(data.checkIn), {
  message: 'Check-out must be after check-in',
  path: ['checkOut'],
});

export type StepDatesData = z.infer<typeof stepDatesSchema>;

// Step 2: Personal
export const stepPersonalSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(7, 'Phone number must be at least 7 characters'),
  photo: z.instanceof(FileList).optional().refine((fileList) => {
    if (!fileList || fileList.length === 0) return true;
    const file = fileList[0];
    return file &&
           file.size <= 5 * 1024 * 1024 &&
           file.type.startsWith('image/');
  }, 'File must be an image and less than 5MB'),
});

export type StepPersonalData = z.infer<typeof stepPersonalSchema>;

// Step 3: Payment
export const stepPaymentSchema = z.object({
  card: z.string().regex(/^\d{16}$/, 'Card number must be 16 digits'),
  expiry: z.string().regex(/^\d{2}\/\d{2}$/, 'Expiry must be in MM/YY format'),
  cvv: z.string().regex(/^\d{3}$/, 'CVV must be 3 digits'),
});

export type StepPaymentData = z.infer<typeof stepPaymentSchema>;