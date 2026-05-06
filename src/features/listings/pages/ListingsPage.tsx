import { useState } from "react";
import { listings } from "../../../data/listings";
import SearchBar from "../components/SearchBar";
import SavedBadge from "../components/SavedBadge";
import ListingCard from "../components/ListingCard";
import "../components/ListingCard.css";
export default function ListingsPage() {
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<number[]>([]);
  const [savedOnly, setSaveOnly] = useState(false);
  const toggleSave = (id: number) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };
  const filtered = listings
    .filter((item) =>
      `${item.title} ${item.location}`
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase()),
    )
    .filter((item) => (savedOnly ? saved.includes(item.id) : true));
  return (
    <div className="container">
      <header>
        <SearchBar value={query} onChange={setQuery} />
        <SavedBadge count={saved.length} />
        <button onClick={() => setSaveOnly(!savedOnly)}>
          {savedOnly ? "Show All" : "Show Saved"}
        </button>
      </header>
      <p>{filtered.length}results are found</p>
      {filtered.length === 0 ? (
        <p>No listings match your search</p>
      ) : (
        <div className="listings-grid">
          {filtered.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              saved={saved.includes(listing.id)}
              onToggleSave={() => toggleSave(listing.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
