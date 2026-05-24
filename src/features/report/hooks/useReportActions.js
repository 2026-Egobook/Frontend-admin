import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  approveReport,
  deleteReportedContent,
  rejectReport,
  saveReportMemo,
} from '../api/reportApi';

export function useApproveReport(reportGroupId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reportDetail', reportGroupId] });
      queryClient.invalidateQueries({ queryKey: ['reportList'] });
    },
  });
}

export function useRejectReport(reportGroupId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reportDetail', reportGroupId] });
      queryClient.invalidateQueries({ queryKey: ['reportList'] });
    },
  });
}

export function useDeleteReportedContent(reportGroupId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReportedContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reportDetail', reportGroupId] });
      queryClient.invalidateQueries({ queryKey: ['reportList'] });
    },
  });
}

export function useSaveReportMemo(reportGroupId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveReportMemo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reportDetail', reportGroupId] });
    },
  });
}
