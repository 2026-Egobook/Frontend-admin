import { useQuery } from '@tanstack/react-query';
import { getReportList } from '../api/reportApi';

export default function useReportList({ contentType, page, size }) {
  return useQuery({
    queryKey: ['reportList', contentType, page, size],
    queryFn: () => getReportList({ contentType, page, size }),
  });
}
