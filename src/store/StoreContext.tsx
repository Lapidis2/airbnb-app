import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { State, Action } from './types';
import { reducer } from './reducer';

const StoreContext = createContext<{
  state: State;
  dispatch: (action: Action) => void;
} | undefined>(undefined);

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  const [state, dispatch] = useReducer(reducer, {
    listings: [],
    loading: true,
    filter: '',
    saved: [],
    showSavedOnly: false
  });

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}