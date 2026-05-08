import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useToggleSaved() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, action }: { id: number; action: 'save' | 'unsave' }) => {
      // Simulate API call
      console.log(`📡 Simulating ${action} for listing ${id}`);
      await new Promise(resolve => setTimeout(resolve, 300));
    },
    onMutate: async ({ id, action }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['saved'] });

      // Snapshot previous value
      const previousSaved = queryClient.getQueryData(['saved']);

      // Optimistically update
      queryClient.setQueryData(['saved'], (old: number[] = []) => {
        if (action === 'save') {
          return [...old, id];
        } else {
          return old.filter((savedId) => savedId !== id);
        }
      });

      return { previousSaved };
    },
    onError: (_err, _variables, context) => {
      // Rollback on error
      if (context?.previousSaved) {
        queryClient.setQueryData(['saved'], context.previousSaved);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['saved'] });
    },
  });
}