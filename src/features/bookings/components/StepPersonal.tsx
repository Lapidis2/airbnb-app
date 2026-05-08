import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepPersonalSchema, type StepPersonalData } from '../schemas/booking';

interface StepPersonalProps {
  onNext: (data: StepPersonalData) => void;
  onBack: () => void;
  initialData?: Partial<StepPersonalData>;
}

export default function StepPersonal({ onNext, onBack, initialData }: StepPersonalProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<StepPersonalData>({
    resolver: zodResolver(stepPersonalSchema),
    defaultValues: initialData,
  });

  const photoFileList = watch('photo');

  React.useEffect(() => {
    if (photoFileList && photoFileList.length > 0) {
      const file = photoFileList[0];
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  }, [photoFileList]);

  return (
    <form onSubmit={handleSubmit(onNext)}>
      <div>
        <label>Name</label>
        <input {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label>Email</label>
        <input type="email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Phone</label>
        <input {...register('phone')} />
        {errors.phone && <p>{errors.phone.message}</p>}
      </div>
      <div>
        <label>Profile Photo (optional)</label>
        <input type="file" accept="image/*" {...register('photo')} />
        {errors.photo && <p style={{ color: 'red', fontSize: '14px' }}>{errors.photo.message}</p>}
        {photoPreview && <img src={photoPreview} alt="Preview" style={{ width: '100px', height: '100px', borderRadius: '8px', marginTop: '10px' }} />}
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