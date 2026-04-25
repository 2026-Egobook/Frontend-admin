import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createPsychologyKnowledge,
  deletePsychologyKnowledge,
  getPsychologyKnowledgeList,
  updatePsychologyKnowledge,
} from '../api/crudApi';

export function usePsychologyKnowledgeList() {
  return useQuery({
    queryKey: ['psychologyKnowledgeList'],
    queryFn: getPsychologyKnowledgeList,
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
