import { useQuery } from '@tanstack/react-query';
import { getReportDetail } from '../api/reportApi';

export default function useReportDetail(reportId) {
  return useQuery({
    queryKey: ['reportDetail', reportId],
    queryFn: () => getReportDetail(reportId),
    enabled: !!reportId,
  });
}
