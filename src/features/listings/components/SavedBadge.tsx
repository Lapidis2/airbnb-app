
import { useFavorites } from '../hooks/useFavorites';

function SavedBadge() {
  const { count } = useFavorites();
  return (
     <div>{count} {count === 1 ? 'saved' : 'saved'}</div>
  )
}

export default SavedBadge