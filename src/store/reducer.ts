import type { State, Action } from './types';

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_LISTINGS':
      return { ...state, listings: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        saved: state.saved.includes(action.payload)
          ? state.saved.filter(id => id !== action.payload)
          : [...state.saved, action.payload]
      };
    case 'TOGGLE_SHOW_SAVED_ONLY':
      return { ...state, showSavedOnly: !state.showSavedOnly };
    case 'RESET':
      return { ...state, filter: '', saved: [] };
    default:
      return state;
  }
}