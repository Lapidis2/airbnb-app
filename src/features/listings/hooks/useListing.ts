import { useQuery } from '@tanstack/react-query';
import { listings as mockListings } from '../../../data/listings';

export function useListing(id: string | undefined) {
  return useQuery({
    queryKey: ['listing', id],
    queryFn: async () => {
      // Simulate API call and always use mock data
      console.log(`📡 Simulating API call for listing ${id}`);
      await new Promise(resolve => setTimeout(resolve, 600));
      const listing = mockListings.find(l => l.id === parseInt(id || '0'));
      if (!listing) throw new Error('Listing not found');
      return listing;
    },
    enabled: !!id,
  });
}