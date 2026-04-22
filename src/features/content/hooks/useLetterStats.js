import { useQuery } from '@tanstack/react-query';
import { getLetterStats } from '../api/contentApi';

function formatDate(date) {
  if (!date) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default function useLetterStats({ startDate, endDate }) {
  return useQuery({
    queryKey: ['letterStats', formatDate(startDate), formatDate(endDate)],
    queryFn: () =>
      getLetterStats({
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      }),
  });
}
