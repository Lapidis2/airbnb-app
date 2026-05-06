import { useStore } from '../../../store/StoreContext';
import toast from 'react-hot-toast';

export function useFavorites() {
  const { state, dispatch } = useStore();

  const toggle = (id: number, title: string) => {
    const isSaved = state.saved.includes(id);
    dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
    toast(isSaved ? `Removed: ${title}` : `Saved: ${title}`);
  };

  const count = state.saved.length;

  const isSaved = (id: number) => state.saved.includes(id);

  return { toggle, count, isSaved };
}