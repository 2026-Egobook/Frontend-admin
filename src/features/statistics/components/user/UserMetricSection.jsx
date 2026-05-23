import { useState } from 'react';
import ChartFilter from '../common/ChartFilter';
import StatisticsCard from '../common/StatisticsCard';
import DauMauChart from './DauMauChart';
import JoinLeaveChart from './JoinLeaveChart';
import RetentionCard from './RetentionCard';
import { useDauMauStats, useJoinWithdrawStats, useRetentionStats } from '../../hooks/useStatistics';
import Spinner from '@/shared/components/ui/Spinner';

function getThisMonthRange() {
  const now = new Date();
  return {
    start: new Date(now.getFullYear(), now.getMonth(), 1),
    end: now,
  };
}

export default function UserMetricSection() {
  const { start, end } = getThisMonthRange();

  const [dauStartDate, setDauStartDate] = useState(start);
  const [dauEndDate, setDauEndDate] = useState(end);

  const [joinStartDate, setJoinStartDate] = useState(start);
  const [joinEndDate, setJoinEndDate] = useState(end);
  const [joinUnit, setJoinUnit] = useState('MONTH');

  const { data: dauData, isLoading: dauLoading } = useDauMauStats({ startDate: dauStartDate, endDate: dauEndDate });
  const { data: joinLeaveData, isLoading: joinLeaveLoading } = useJoinWithdrawStats({ startDate: joinStartDate, endDate: joinEndDate, unit: joinUnit });
  const { data: retentionData } = useRetentionStats();

  return (
    <div className="flex flex-col gap-6">
      <StatisticsCard>
        <h2 className="mb-4 text-lg font-semibold text-neutral-950">DAU / MAU</h2>

        <div className="mb-4">
          <ChartFilter
            startDate={dauStartDate}
            endDate={dauEndDate}
            onStartDateChange={setDauStartDate}
            onEndDateChange={setDauEndDate}
          />
        </div>

        {dauLoading ? <Spinner /> : <DauMauChart data={dauData ?? []} />}
      </StatisticsCard>

      <StatisticsCard>
        <h2 className="mb-4 text-lg font-semibold text-neutral-950">신규 가입 / 탈퇴</h2>

        <div className="mb-4">
          <ChartFilter
            startDate={joinStartDate}
            endDate={joinEndDate}
            onStartDateChange={setJoinStartDate}
            onEndDateChange={setJoinEndDate}
            unit={joinUnit}
            onUnitChange={setJoinUnit}
          />
        </div>

        {joinLeaveLoading ? <Spinner /> : <JoinLeaveChart data={joinLeaveData ?? []} />}
      </StatisticsCard>

      <RetentionCard data={retentionData} />
    </div>
  );
}
