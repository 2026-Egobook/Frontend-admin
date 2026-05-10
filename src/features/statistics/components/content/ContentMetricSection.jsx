import { useState } from 'react';
import ChartFilter from '../common/ChartFilter';
import StatisticsCard from '../common/StatisticsCard';
import DiaryTypeChart from './DiaryTypeChart';
import LetterGiveUpStatus from './LetterGiveUpStatus';
import { useContentStatistics } from '../../hooks/useStatistics';

export default function ContentMetricSection() {
  const [diaryStartDate, setDiaryStartDate] = useState(new Date('2026-04-01'));
  const [diaryEndDate, setDiaryEndDate] = useState(new Date('2026-04-09'));

  const { data } = useContentStatistics();

  if (!data) return null;

  return (
    <div className="flex flex-col gap-6">
      <StatisticsCard>
        <h2 className="mb-4 text-lg font-semibold text-neutral-950">타입별 일기 작성 수</h2>

        <div className="mb-4">
          <ChartFilter
            startDate={diaryStartDate}
            endDate={diaryEndDate}
            onStartDateChange={setDiaryStartDate}
            onEndDateChange={setDiaryEndDate}
          />
        </div>

        <div className="mb-4">
          <p className="text-sm text-neutral-600">전체 일기 수</p>
          <p className="text-2xl font-semibold text-neutral-950">
            {data.totalDiaryCount.toLocaleString()}건
          </p>
        </div>

        <DiaryTypeChart data={data.diaryTypeStats} />
      </StatisticsCard>

      <LetterGiveUpStatus data={data.letterGiveUp} />
    </div>
  );
}