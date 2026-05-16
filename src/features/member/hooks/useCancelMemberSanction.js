import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelMemberRestriction } from '../api/memberApi';

export function useCancelMemberSanction(userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelMemberRestriction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memberRestrictions', userId] });
    },
  });
}
