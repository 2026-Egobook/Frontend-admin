import { useQuery } from '@tanstack/react-query';
import { getMemberList } from '../api/memberApi';

export const useMemberList = ({ keyword, status, page, size }) => {
  return useQuery({
    queryKey: ['memberList', keyword, status, page, size],
    queryFn: () => getMemberList({ keyword, status, page, size }),
  });
};
