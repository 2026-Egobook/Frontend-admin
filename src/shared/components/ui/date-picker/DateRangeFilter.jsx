import { useState } from 'react';
import CustomDatePopover from './CustomDatePopover';

const toDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export default function DateRangeFilter({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) {
  const [error, setError] = useState(null);

  const handleStartDateChange = (date) => {
    onStartDateChange(date);
    if (endDate && toDay(date) > toDay(endDate)) {
      onEndDateChange(date);
    }
    setError(null);
  };

  const handleEndDateChange = (date) => {
    if (startDate && toDay(date) < toDay(startDate)) {
      setError('종료일은 시작일 이후로 선택해주세요.');
      onEndDateChange(startDate);
      return;
    }
    setError(null);
    onEndDateChange(date);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3">
        <CustomDatePopover value={startDate} onChange={handleStartDateChange} />
        <span className="text-sm text-neutral-400">~</span>
        <CustomDatePopover value={endDate} onChange={handleEndDateChange} />
      </div>

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
