import { useState } from 'react';
import ChartFilter from '../common/ChartFilter';
import StatisticsCard from '../common/StatisticsCard';
import DauMauChart from './DauMauChart';
import JoinLeaveChart from './JoinLeaveChart';
import RetentionCard from './RetentionCard';
import { useUserStatistics } from '../../hooks/useStatistics';

export default function UserMetricSection() {
  const [dauStartDate, setDauStartDate] = useState(new Date('2026-04-01'));
  const [dauEndDate, setDauEndDate] = useState(new Date('2026-04-09'));

  const [joinStartDate, setJoinStartDate] = useState(new Date('2026-04-01'));
  const [joinEndDate, setJoinEndDate] = useState(new Date('2026-04-09'));

  const { data } = useUserStatistics();

  if (!data) return null;

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

        <DauMauChart data={data.dauMau} />
      </StatisticsCard>

      <StatisticsCard>
        <h2 className="mb-4 text-lg font-semibold text-neutral-950">신규 가입 / 탈퇴</h2>

        <div className="mb-4">
          <ChartFilter
            startDate={joinStartDate}
            endDate={joinEndDate}
            onStartDateChange={setJoinStartDate}
            onEndDateChange={setJoinEndDate}
          />
        </div>

        <JoinLeaveChart data={data.joinLeave} />
      </StatisticsCard>

      <RetentionCard data={data.retention} />
    </div>
  );
}