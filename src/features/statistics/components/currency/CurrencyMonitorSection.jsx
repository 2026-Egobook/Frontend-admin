import { useState } from 'react';
import ChartFilter from '../common/ChartFilter';
import StatisticsCard from '../common/StatisticsCard';
import InkChart from './InkChart';
import InkSummaryCard from './InkSummaryCard';
import { useCurrencyStatistics } from '../../hooks/useStatistics';

export default function CurrencyMonitorSection() {
  const [startDate, setStartDate] = useState(new Date('2026-04-01'));
  const [endDate, setEndDate] = useState(new Date('2026-04-09'));

  const { data } = useCurrencyStatistics();

  if (!data) return null;

  return (
    <StatisticsCard>
      <h2 className="mb-4 text-lg font-semibold text-neutral-950">잉크 발행 / 소비 현황</h2>

      <div className="mb-4">
        <ChartFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </div>

      <InkChart data={data.inkStats} />

      <div className="mt-6 grid grid-cols-3 gap-4">
        {data.inkStats.map((item) => (
          <InkSummaryCard key={item.date} item={item} />
        ))}
      </div>
    </StatisticsCard>
  );
}