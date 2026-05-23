import { useState } from 'react';
import ChartFilter from '../common/ChartFilter';
import StatisticsCard from '../common/StatisticsCard';
import WithdrawalPieChart from './WithdrawalPieChart';
import WithdrawalReasonList from './WithdrawalReasonList';
import { useWithdrawReasonStats } from '../../hooks/useStatistics';
import Spinner from '@/shared/components/ui/Spinner';

function getThisMonthRange() {
  const now = new Date();
  return {
    start: new Date(now.getFullYear(), now.getMonth(), 1),
    end: now,
  };
}

export default function WithdrawalReasonSection() {
  const { start, end } = getThisMonthRange();

  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);

  const { data, isLoading } = useWithdrawReasonStats({ startDate, endDate });

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

      {isLoading ? <Spinner /> : data && (
        <>
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
        </>
      )}
    </StatisticsCard>
  );
}
