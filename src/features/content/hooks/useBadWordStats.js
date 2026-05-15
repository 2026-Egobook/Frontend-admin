import { useQuery } from '@tanstack/react-query';
import { getBadWordStats } from '../api/contentApi';

function formatDate(date) {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function useBadWordStats({ startDate, endDate, type = 'ALL' }) {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  return useQuery({
    queryKey: ['badWordStats', start, end, type],
    queryFn: () => getBadWordStats({ startDate: start, endDate: end, type }),
    enabled: !!start && !!end,
  });
}
