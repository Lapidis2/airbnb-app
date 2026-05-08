import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useListing } from '../hooks/useListing';
import dayjs from 'dayjs';
import numeral from 'numeral';
import { FaStar, FaMapMarkedAlt } from 'react-icons/fa';
import BookingForm from '../../bookings/components/BookingForm';
import Spinner from '../../../shared/components/Spinner';

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: listing, isLoading, isError } = useListing(id);
  const navigate = useNavigate();
  const [showBooking, setShowBooking] = useState(false);

  if (isLoading) return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <Spinner />
      <p style={{ marginTop: '20px', color: '#666' }}>Loading listing details...</p>
    </div>
  );

  if (isError || !listing) return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>Listing not found</h2>
      <p>The listing you're looking for doesn't exist or has been removed.</p>
      <button
        onClick={() => navigate('/')}
        style={{
          background: '#ff385c',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          marginTop: '20px'
        }}
      >
        Back to Listings
      </button>
    </div>
  );

  return (
    <div style={{ padding: '20px' }}>
      <div style={{
        position: 'fixed',
        top: '80px',
        left: '20px',
        zIndex: 100
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: '#ff385c',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        >
          ← Back
        </button>
      </div>
      <img src={listing.img} alt={listing.title} style={{ width: '100%', maxWidth: '600px', borderRadius: '12px' }} />
      <h1>{listing.title}</h1>
      <p><FaMapMarkedAlt /> {listing.location}</p>
      <p><FaStar /> {numeral(listing.rating).format('0.0')}</p>
      <p>${numeral(listing.price).format('0')}</p>
      {listing.superhost && <span style={{ background: '#000', color: '#fff', padding: '4px 8px', borderRadius: '4px' }}>Superhost</span>}
      <p>Available from {dayjs(listing.availableFrom).format('MMM DD YYYY')}</p>
      <button
        onClick={() => setShowBooking(true)}
        style={{
          background: '#ff385c',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          marginTop: '20px'
        }}
      >
        Book Now
      </button>
      {showBooking && <BookingForm listingId={listing.id} onClose={() => setShowBooking(false)} />}
    </div>
  );
}