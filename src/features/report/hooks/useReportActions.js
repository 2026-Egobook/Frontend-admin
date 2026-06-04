import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  approveReport,
  deleteReportedContent,
  rejectReport,
  saveReportMemo,
} from '../api/reportApi';

export function useApproveReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reportDetail'] });
      queryClient.invalidateQueries({ queryKey: ['reportList'] });
    },
  });
}

export function useRejectReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reportDetail'] });
      queryClient.invalidateQueries({ queryKey: ['reportList'] });
    },
  });
}

export function useDeleteReportedContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReportedContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reportDetail'] });
      queryClient.invalidateQueries({ queryKey: ['reportList'] });
    },
  });
}

export function useSaveReportMemo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveReportMemo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reportDetail'] });
    },
  });
}
