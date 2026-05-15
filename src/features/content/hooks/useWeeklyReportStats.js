import { useQuery } from '@tanstack/react-query';
import { getWeeklyReportStats } from '../api/contentApi';

function formatDate(date) {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function useWeeklyReportStats({ startDate, endDate }) {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  return useQuery({
    queryKey: ['weeklyReportStats', start, end],
    queryFn: () => getWeeklyReportStats({ startDate: start, endDate: end }),
    enabled: !!start && !!end && start <= end,
  });
}
