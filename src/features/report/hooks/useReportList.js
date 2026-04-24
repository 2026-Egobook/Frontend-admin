import { useQuery } from '@tanstack/react-query';
import { getReportList } from '../api/reportApi';

export default function useReportList(filters) {
  return useQuery({
    queryKey: ['reportList', filters],
    queryFn: () => getReportList(filters),
  });
}
