import { useMemo, useState, useCallback } from "react";

import { useStore } from "../../../store/StoreContext";
import { useListings } from "../hooks/useListings";
import { useFavorites } from "../hooks/useFavorites";
import SearchBar from "../components/SearchBar";
import SavedBadge from "../components/SavedBadge";
import ListingCard from "../components/ListingCard";
import SavedListings from "../components/SavedListings";
import Spinner from "../../../shared/components/Spinner";
import "./ListingsPage.css";

export default function ListingsPage() {
  const { state, dispatch } = useStore();
  const { toggle, isSaved } = useFavorites();
  const [showSavedPanel, setShowSavedPanel] = useState(false);

  useListings();

  const handleToggleSave = useCallback((id: number, title: string) => {
    toggle(id, title);
  }, [toggle]);

  const filtered = useMemo(() => {
    return state.listings
      .filter((item) =>
        `${item.title} ${item.location}`
          .toLowerCase()
          .includes(state.filter.toLowerCase())
      )
      .filter((item) => (!state.showSavedOnly || isSaved(item.id)));
  }, [state.listings, state.filter, state.showSavedOnly, isSaved]);

  if (state.loading) {
    return <Spinner />;
  }

  return (
    <div className="container">
      <header>
        <SearchBar />
        <div className="header-right">
          <SavedBadge />
          <button onClick={() => setShowSavedPanel(true)}>
            View Saved
          </button>
          <button onClick={() => dispatch({ type: 'TOGGLE_SHOW_SAVED_ONLY' })}>
            {state.showSavedOnly ? "Show All" : "Show Saved"}
          </button>
          <button onClick={() => dispatch({ type: 'RESET' })}>
            Clear All
          </button>
        </div>
      </header>
      <p>{filtered.length} results are found</p>
      {filtered.length === 0 ? (
        <p>No listings match your search</p>
      ) : (
        <div className="listings-grid">
          {filtered.map((listing) => (
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
