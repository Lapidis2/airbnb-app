import { useQuery } from '@tanstack/react-query';

export function useSaved() {
  return useQuery({
    queryKey: ['saved'],
    queryFn: async () => {
      // Simulate API call and return saved state
      console.log('📡 Simulating API call for saved listings');
      return [];
    },
  });
}