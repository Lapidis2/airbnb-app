import { Transition } from '@headlessui/react';
import { useStore } from '../../../store/StoreContext';
import type { Listing } from '../types';
import numeral from 'numeral';

interface SavedListingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SavedListings({ isOpen, onClose }: SavedListingsProps) {
  const { state } = useStore();

  const savedListings: Listing[] = state.listings.filter(listing =>
    state.saved.includes(listing.id)
  );

  return (
    <Transition
      show={isOpen}
      enter="transition-transform duration-300"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transition-transform duration-300"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
    >
      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 overflow-y-auto">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Saved Listings</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          {savedListings.length === 0 ? (
            <p className="text-gray-500">No saved listings yet.</p>
          ) : (
            <div className="space-y-4">
              {savedListings.map(listing => (
                <div key={listing.id} className="border rounded p-3">
                  <h3 className="font-semibold">{listing.title}</h3>
                  <p className="text-sm text-gray-600">{listing.location}</p>
                  <p className="text-sm font-medium">{numeral(listing.price).format('$0')}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Transition>
  );
}