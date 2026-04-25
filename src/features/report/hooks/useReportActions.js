import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  applyReportSanction,
  deleteReportedContent,
  rejectReportGroup,
  saveReportMemo,
  updateReportStatus,
} from '../api/reportApi';

export function useUpdateReportStatus(reportGroupId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReportStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reportDetail', reportGroupId] });
      queryClient.invalidateQueries({ queryKey: ['reportList'] });
    },
  });
}

export function useRejectReportGroup(reportGroupId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectReportGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reportDetail', reportGroupId] });
      queryClient.invalidateQueries({ queryKey: ['reportList'] });
    },
  });
}

export function useApplyReportSanction(reportGroupId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applyReportSanction,
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
