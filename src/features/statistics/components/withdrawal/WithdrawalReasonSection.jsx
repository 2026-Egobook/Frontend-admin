import { useState } from 'react';
import ChartFilter from '../common/ChartFilter';
import StatisticsCard from '../common/StatisticsCard';
import WithdrawalPieChart from './WithdrawalPieChart';
import WithdrawalReasonList from './WithdrawalReasonList';
import { useWithdrawalStatistics } from '../../hooks/useStatistics';

export default function WithdrawalReasonSection() {
  const [startDate, setStartDate] = useState(new Date('2026-04-01'));
  const [endDate, setEndDate] = useState(new Date('2026-04-09'));

  const { data } = useWithdrawalStatistics();

  if (!data) return null;

  return (
    <StatisticsCard>
      <h2 className="mb-4 text-lg font-semibold text-neutral-950">탈퇴 사유 통계</h2>

      <div className="mb-6">
        <ChartFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </div>

      <div className="mb-8">
        <p className="text-sm text-neutral-600">전체 탈퇴 수</p>
        <p className="text-2xl font-semibold text-neutral-950">
          {data.totalCount.toLocaleString()}건
        </p>
      </div>

      <div className="grid min-w-0 grid-cols-[1fr_1.4fr] items-center gap-8">
        <WithdrawalPieChart data={data.reasons} />
        <WithdrawalReasonList reasons={data.reasons} />
      </div>
    </StatisticsCard>
  );
}