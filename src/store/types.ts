import type { Listing } from '../features/listings/types';

export interface State {
  listings: Listing[];
  loading: boolean;
  filter: string;
  saved: number[];
  showSavedOnly: boolean;
}

export type Action =
  | { type: 'SET_LISTINGS'; payload: Listing[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_FILTER'; payload: string }
  | { type: 'TOGGLE_FAVORITE'; payload: number }
  | { type: 'TOGGLE_SHOW_SAVED_ONLY' };