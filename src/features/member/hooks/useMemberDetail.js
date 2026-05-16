import { useQuery } from '@tanstack/react-query';
import { getMemberDetail } from '../api/memberApi';

export function useMemberDetail(memberId) {
  return useQuery({
    queryKey: ['memberDetail', memberId],
    queryFn: () => getMemberDetail(memberId),
    enabled: !!memberId,
  });
}
