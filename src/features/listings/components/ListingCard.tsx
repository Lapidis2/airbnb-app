import { memo } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Listing } from "../types";
import { FaHeart, FaRegHeart, FaStar, FaMapMarkedAlt } from "react-icons/fa";
import { format } from "date-fns";
import styles from "./ListingCard.module.css"
import numeral from "numeral";
interface props {
  listing: Listing;
  saved: boolean;
  onToggleSave: () => void;
}

function ListingCard({ listing, saved, onToggleSave }: props) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => navigate(`/listings/${listing.id}`)}
      className={clsx(styles.card, {
        [styles.saved]: saved,
        [styles.luxury]: listing.price > 300,
        [styles.booked]: !listing.available,
        [styles.superhost]: listing.superhost,
      })}
      style={{ cursor: 'pointer' }}
    >
        <img src={listing.img} alt={listing.title}/>
        <button onClick={(e) => { e.stopPropagation(); onToggleSave(); }}>
            {saved ? <FaHeart /> : <FaRegHeart />}
        </button>
        <p className={styles.title}>{listing.title}</p>
       <div className={styles.cardItems}>

          <p>


             <FaMapMarkedAlt />{listing.location}

        </p>
        <p>
            <FaStar/>{numeral(listing.rating).format('0.0')}
        </p>
        <p>{numeral(listing.price).format('$0')}</p>
       </div>

        {listing.superhost && (
   <span className={styles.badgeSuperhost}>Superhost</span>
 )}

{listing.price > 300 && (
   <span className={styles.badgeLuxury}>Luxury</span>
 )}

        <p className={styles.bookingInfo}>
            {listing.available ? "Available" : "Booked"} from{' '}
            {format(new Date(listing.availableFrom), "MMM dd yyyy")}
        </p>

    </motion.div>
  );
}

export default memo(ListingCard);
