import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../../store/StoreContext';
import dayjs from 'dayjs';
import numeral from 'numeral';
import { FaStar, FaMapMarkedAlt } from 'react-icons/fa';

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const { state } = useStore();
  const navigate = useNavigate();

  const listing = state.listings.find((l: any) => l.id === parseInt(id || '0'));

  if (!listing) {
    return <div>Listing not found</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate(-1)}>Back</button>
      <img src={listing.img} alt={listing.title} style={{ width: '100%', maxWidth: '600px' }} />
      <h1>{listing.title}</h1>
      <p><FaMapMarkedAlt /> {listing.location}</p>
      <p><FaStar /> {numeral(listing.rating).format('0.0')}</p>
      <p>${numeral(listing.price).format('0')}</p>
      {listing.superhost && <span>Superhost</span>}
      <p>Available from {dayjs(listing.availableFrom).format('MMM DD YYYY')}</p>
    </div>
  );
}