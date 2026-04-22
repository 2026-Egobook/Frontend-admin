import { useQuery } from '@tanstack/react-query';
import { getBadWordStats } from '../api/contentApi';

function formatDate(date) {
  if (!date) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default function useBadWordStats({ startDate, endDate }) {
  return useQuery({
    queryKey: ['badWordStats', formatDate(startDate), formatDate(endDate)],
    queryFn: () =>
      getBadWordStats({
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      }),
  });
}
