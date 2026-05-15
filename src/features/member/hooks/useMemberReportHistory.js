import { useQuery } from '@tanstack/react-query';
import { getMemberReportHistory } from '../api/memberApi';

export function useMemberReportHistory({ userId, reportDomainType, reportType, reportReason, reportStatus, page = 1, size = 10 }) {
  return useQuery({
    queryKey: ['memberReportHistory', userId, reportDomainType, reportType, reportReason, reportStatus, page, size],
    queryFn: () => getMemberReportHistory({ userId, reportDomainType, reportType, reportReason, reportStatus, page, size }),
    enabled: !!userId,
  });
}
