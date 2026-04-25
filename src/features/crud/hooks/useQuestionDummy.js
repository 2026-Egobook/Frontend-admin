import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createQuestionDummy,
  deleteQuestionDummy,
  getQuestionDummyList,
  updateQuestionDummy,
} from '../api/crudApi';

export function useQuestionDummyList() {
  return useQuery({
    queryKey: ['questionDummyList'],
    queryFn: getQuestionDummyList,
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
