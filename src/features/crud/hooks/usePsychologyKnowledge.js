import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createPsychologyKnowledge,
  deletePsychologyKnowledge,
  getPsychologyKnowledgeList,
  updatePsychologyKnowledge,
} from '../api/crudApi';

export function usePsychologyKnowledgeList({ size = 20 } = {}) {
  return useInfiniteQuery({
    queryKey: ['psychologyKnowledgeList', size],
    queryFn: ({ pageParam = 1 }) => getPsychologyKnowledgeList({ page: pageParam, size }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasNext ? allPages.length + 1 : undefined,
  });
}

export function useCreatePsychologyKnowledge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPsychologyKnowledge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['psychologyKnowledgeList'] });
    },
  });
}

export function useUpdatePsychologyKnowledge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePsychologyKnowledge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['psychologyKnowledgeList'] });
    },
  });
}

export function useDeletePsychologyKnowledge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePsychologyKnowledge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['psychologyKnowledgeList'] });
    },
  });
}
