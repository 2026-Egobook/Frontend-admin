import { useMutation, useQueryClient } from '@tanstack/react-query';
import { applyMemberRestriction } from '../api/memberApi';

export function useApplyMemberSanction(userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applyMemberRestriction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memberRestrictions', userId] });
    },
  });
}
