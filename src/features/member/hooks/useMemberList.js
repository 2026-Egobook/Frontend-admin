import { useInfiniteQuery } from '@tanstack/react-query';
import { getMemberList } from '../api/memberApi';

export const useMemberList = ({ keyword, status, size = 20 }) => {
  return useInfiniteQuery({
    queryKey: ['memberList', keyword, status, size],
    queryFn: ({ pageParam = 1 }) => getMemberList({ keyword, status, page: pageParam, size }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasNext ? allPages.length + 1 : undefined,
  });
};
