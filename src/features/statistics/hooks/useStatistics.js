import { useQuery } from '@tanstack/react-query';
import {
  getDauMauStats,
  getDiaryStats,
  getInkStats,
  getJoinWithdrawStats,
  getLetterGiveUpStats,
  getRetentionStats,
  getWithdrawReasonStats,
} from '../api/statisticsApi';

function formatDate(date) {
  if (!date) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function useDauMauStats({ startDate, endDate }) {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  return useQuery({
    queryKey: ['dauMauStats', start, end],
    queryFn: () => getDauMauStats({ startDate, endDate }),
    enabled: !!start && !!end,
  });
}

export function useRetentionStats() {
  return useQuery({
    queryKey: ['retentionStats'],
    queryFn: getRetentionStats,
  });
}

export function useJoinWithdrawStats({ startDate, endDate, unit }) {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  return useQuery({
    queryKey: ['joinWithdrawStats', start, end, unit],
    queryFn: () => getJoinWithdrawStats({ startDate, endDate, unit }),
    enabled: !!start && !!end,
  });
}

export function useWithdrawReasonStats({ startDate, endDate }) {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  return useQuery({
    queryKey: ['withdrawReasonStats', start, end],
    queryFn: () => getWithdrawReasonStats({ startDate, endDate }),
    enabled: !!start && !!end,
  });
}

export function useLetterGiveUpStats({ startDate, endDate }) {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  return useQuery({
    queryKey: ['letterGiveUpStats', start, end],
    queryFn: () => getLetterGiveUpStats({ startDate, endDate }),
    enabled: !!start && !!end,
  });
}

export function useDiaryStats({ startDate, endDate }) {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  return useQuery({
    queryKey: ['diaryStats', start, end],
    queryFn: () => getDiaryStats({ startDate, endDate }),
    enabled: !!start && !!end,
  });
}

export function useInkStats({ startDate, endDate, unit }) {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  return useQuery({
    queryKey: ['inkStats', start, end, unit],
    queryFn: () => getInkStats({ startDate, endDate, unit }),
    enabled: !!start && !!end,
  });
}
