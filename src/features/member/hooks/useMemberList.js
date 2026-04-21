import { useQuery } from "@tanstack/react-query";
import { getMemberList } from "../api/memberApi";

export const useMemberList = ({ keyword, status }) => {
  return useQuery({
    queryKey: ["memberList", keyword, status],
    queryFn: () => getMemberList({ keyword, status }),
  });
};