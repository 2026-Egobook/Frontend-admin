import { useState } from 'react';
import ChartFilter from '../common/ChartFilter';
import StatisticsCard from '../common/StatisticsCard';
import InkChart from './InkChart';
import InkSummaryCard from './InkSummaryCard';
import { useInkStats } from '../../hooks/useStatistics';
import Spinner from '@/shared/components/ui/Spinner';

export default function CurrencyMonitorSection() {
  const [startDate, setStartDate] = useState(new Date('2026-01-01'));
  const [endDate, setEndDate] = useState(new Date('2026-04-30'));
  const [unit, setUnit] = useState('MONTH');

  const { data: inkData, isLoading } = useInkStats({ startDate, endDate, unit });

  return (
    <StatisticsCard>
      <h2 className="mb-4 text-lg font-semibold text-neutral-950">잉크 발행 / 소비 현황</h2>

      <div className="mb-4">
        <ChartFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          unit={unit}
          onUnitChange={setUnit}
        />
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <InkChart data={inkData ?? []} />
          <div className="mt-6 grid grid-cols-3 gap-4">
            {(inkData ?? []).map((item) => (
              <InkSummaryCard key={item.date} item={item} />
            ))}
          </div>
        </>
      )}
    </StatisticsCard>
  );
}
