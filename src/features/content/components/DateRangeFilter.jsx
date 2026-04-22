import CustomDatePopover from './CustomDatePopover';

export default function DateRangeFilter({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) {
  return (
    <div className="flex items-center gap-3">
      <CustomDatePopover value={startDate} onChange={onStartDateChange} />
      <CustomDatePopover value={endDate} onChange={onEndDateChange} />
    </div>
  );
}
