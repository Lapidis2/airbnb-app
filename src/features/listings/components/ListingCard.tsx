import clsx from "clsx";
import type { Listing } from "../types";
import { FaHeart, FaRegHeart, FaStar, FaMapMarkedAlt } from "react-icons/fa";
import { format } from "date-fns";
import "../components/ListingCard.css"
import numeral from "numeral";
interface props {
  listing: Listing;
  saved: boolean;
  onToggleSave: () => void;
}

export default function ListingCard({ listing, saved, onToggleSave }: props) {
  return (
    <div
      className={clsx("card", {
        "card--saved": saved,
        "card--luxury": listing.price > 300,
        "card--booked": !listing.available,
      })}
    >
        <img src={listing.img} alt={listing.title}/>
        <button onClick={onToggleSave}>
           {saved ? <FaHeart /> : <FaRegHeart />}
        </button>
       <div className="card-items">
         <p>
      
         
            <FaMapMarkedAlt />{listing.location}
         
        </p>
        <p>
            <FaStar/>{numeral(listing.rating).format('0.0')}
        </p>
        <p>{numeral(listing.price).format('$0')}</p>
       </div>

       {listing.superhost && (
  <span className="badge badge--superhost">Superhost</span>
)}

{listing.price > 300 && (
  <span className="badge badge--luxury">Luxury</span>
)}

        <p className="booking-info">
            {listing.available ? "Available" : "Booked"} from{' '}
            {format(new Date(listing.availableFrom), "MMM dd yyyy")}
        </p>

    </div>
  );
}
