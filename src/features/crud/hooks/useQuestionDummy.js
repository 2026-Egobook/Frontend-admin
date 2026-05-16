import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createQuestionDummy,
  deleteQuestionDummy,
  getQuestionDummyList,
  updateQuestionDummy,
} from '../api/crudApi';

export function useQuestionDummyList({ size = 20 } = {}) {
  return useInfiniteQuery({
    queryKey: ['questionDummyList', size],
    queryFn: ({ pageParam = 1 }) => getQuestionDummyList({ page: pageParam, size }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasNext ? allPages.length + 1 : undefined,
  });
}

export function useCreateQuestionDummy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuestionDummy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questionDummyList'] });
    },
  });
}

export function useUpdateQuestionDummy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateQuestionDummy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questionDummyList'] });
    },
  });
}

export function useDeleteQuestionDummy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteQuestionDummy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questionDummyList'] });
    },
  });
}
