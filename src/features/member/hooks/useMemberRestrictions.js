import { useQuery } from '@tanstack/react-query';
import { getMemberRestrictions } from '../api/memberApi';

export function useMemberRestrictions({ userId, page = 1, size = 10, status } = {}) {
  return useQuery({
    queryKey: ['memberRestrictions', userId, page, size, status],
    queryFn: () => getMemberRestrictions({ userId, page, size, status }),
    enabled: !!userId,
  });
}
