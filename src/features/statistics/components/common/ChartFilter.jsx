import DateRangeFilter from '@/shared/components/ui/date-picker/DateRangeFilter';

export default function ChartFilter({ startDate, endDate, onStartDateChange, onEndDateChange }) {
  return (
    <div className="flex items-center gap-4">
      <DateRangeFilter
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
      />
    </div>
  );
}