import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelMemberSanction } from '../api/memberApi';

export function useCancelMemberSanction(memberId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelMemberSanction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memberDetail', memberId] });
    },
  });
}
