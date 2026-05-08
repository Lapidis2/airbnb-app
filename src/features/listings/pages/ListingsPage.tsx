import { useMemo, useState, useCallback } from "react";
import { useListings } from "../hooks/useListings";
import { useFavorites } from "../hooks/useFavorites";
import type { Listing } from "../types";
import SearchBar from "../components/SearchBar";
import SavedBadge from "../components/SavedBadge";
import ListingCard from "../components/ListingCard";
import SavedListings from "../components/SavedListings";
import Spinner from "../../../shared/components/Spinner";
import "./ListingsPage.css";

export default function ListingsPage() {
  const { toggle, isSaved } = useFavorites();
  const [showSavedPanel, setShowSavedPanel] = useState(false);
  const [filter, setFilter] = useState("");
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const { data: listings = [], isLoading, isError, refetch } = useListings();

  const handleToggleSave = useCallback((id: number, title: string) => {
    toggle(id, title);
  }, [toggle]);

  const filtered = useMemo(() => {
    return listings
      .filter((item: Listing) =>
        `${item.title} ${item.location}`
          .toLowerCase()
          .includes(filter.toLowerCase())
      )
      .filter((item: Listing) => (!showSavedOnly || isSaved(item.id)));
  }, [listings, filter, showSavedOnly, isSaved]);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spinner />
        <p style={{ marginTop: '20px', color: '#666' }}>Loading amazing listings...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Unable to load listings</h2>
        <p>Please check your internet connection or try again later.</p>
        <button
          onClick={() => refetch()}
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
          Try Again
        </button>
        <p style={{ marginTop: '20px', color: '#666', fontSize: '14px' }}>
          💡 Demo mode: Check browser console for fallback data usage
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <header>
        <SearchBar value={filter} onChange={setFilter} />
        <div className="header-right">
          <SavedBadge />
          <button onClick={() => setShowSavedPanel(true)}>
            View Saved
          </button>
          <button onClick={() => setShowSavedOnly(!showSavedOnly)}>
            {showSavedOnly ? "Show All" : "Show Saved"}
          </button>
          <button onClick={() => {
            setFilter("");
            setShowSavedOnly(false);
          }}>
            Clear All
          </button>
        </div>
      </header>
      <p>{filtered.length} results are found</p>
      {filtered.length === 0 ? (
        <p>No listings match your search</p>
      ) : (
        <div className="listings-grid">
          {filtered.map((listing: Listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              saved={isSaved(listing.id)}
              onToggleSave={() => handleToggleSave(listing.id, listing.title)}
            />
          ))}
        </div>
      )}
      <SavedListings
        isOpen={showSavedPanel}
        onClose={() => setShowSavedPanel(false)}
      />
    </div>
  );
}
