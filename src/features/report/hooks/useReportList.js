import { useInfiniteQuery } from '@tanstack/react-query';
import { getReportList } from '../api/reportApi';

export default function useReportList({ contentType, size = 20 }) {
  return useInfiniteQuery({
    queryKey: ['reportList', contentType, size],
    queryFn: ({ pageParam = 1 }) => getReportList({ contentType, page: pageParam, size }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasNext ? allPages.length + 1 : undefined,
  });
}
