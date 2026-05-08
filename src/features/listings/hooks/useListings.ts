import { useQuery } from '@tanstack/react-query';
import { listings as mockListings } from '../../../data/listings';

export function useListings() {
  return useQuery({
    queryKey: ['listings'],
    queryFn: async () => {
      // Simulate API call and always use mock data
      console.log('📡 Simulating API call for listings');
      await new Promise(resolve => setTimeout(resolve, 800));
      return mockListings;
    },
  });
}