import { useSaved } from './useSaved';
import { useToggleSaved } from './useToggleSaved';
import toast from 'react-hot-toast';

export function useFavorites() {
  const { data: saved = [] as number[] } = useSaved();
  const toggleMutation = useToggleSaved();

  const toggle = (id: number, title: string) => {
    const isSaved = saved.includes(id);
    toggleMutation.mutate({ id, action: isSaved ? 'unsave' : 'save' });
    toast(isSaved ? `Removed: ${title}` : `Saved: ${title}`);
  };

  const count = saved.length;

  const isSaved = (id: number) => saved.includes(id);

  return { toggle, count, isSaved };
}