import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateReportStatus } from '../api/memberApi';

export function useUpdateReportStatus(memberId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReportStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memberDetail', memberId] });
    },
  });
}
