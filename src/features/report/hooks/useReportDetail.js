import { useQuery } from '@tanstack/react-query';
import { getReportDetail } from '../api/reportApi';

export default function useReportDetail(contentType, reportId) {
  return useQuery({
    queryKey: ['reportDetail', contentType, reportId],
    queryFn: () => getReportDetail(contentType, reportId),
    enabled: !!contentType && !!reportId,
  });
}
