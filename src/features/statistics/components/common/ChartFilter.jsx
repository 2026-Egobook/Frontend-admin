import DateRangeFilter from '@/shared/components/ui/date-picker/DateRangeFilter';

export default function ChartFilter({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  unit,
  onUnitChange,
}) {
  return (
    <div className="flex items-center gap-4">
      <DateRangeFilter
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
      />

      {onUnitChange && (
        <div className="flex overflow-hidden rounded border border-neutral-300">
          {[
            { label: '주별', value: 'WEEK' },
            { label: '월별', value: 'MONTH' },
          ].map(({ label, value }) => (
            <button
              key={value}
              type="button"
              onClick={() => onUnitChange(value)}
              className={[
                'h-8 px-3 text-sm font-medium transition-colors',
                unit === value
                  ? 'bg-black text-white'
                  : 'bg-white text-neutral-600 hover:bg-neutral-50',
              ].join(' ')}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
