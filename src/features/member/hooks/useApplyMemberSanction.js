import { useMutation, useQueryClient } from '@tanstack/react-query';
import { applyMemberSanction } from '../api/memberApi';

export function useApplyMemberSanction(memberId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applyMemberSanction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memberDetail', memberId] });
    },
  });
}
