import { useQuery } from '@tanstack/react-query';
import { getMemberStats } from '../api/memberApi';

export function useMemberStats(userId) {
  return useQuery({
    queryKey: ['memberStats', userId],
    queryFn: () => getMemberStats(userId),
    enabled: !!userId,
  });
}
