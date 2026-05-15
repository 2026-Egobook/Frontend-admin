import { useState } from 'react';
import ChartFilter from '../common/ChartFilter';
import StatisticsCard from '../common/StatisticsCard';
import DiaryTypeChart from './DiaryTypeChart';
import LetterGiveUpStatus from './LetterGiveUpStatus';
import { useDiaryStats, useLetterGiveUpStats } from '../../hooks/useStatistics';
import Spinner from '@/shared/components/ui/Spinner';

export default function ContentMetricSection() {
  const [diaryStartDate, setDiaryStartDate] = useState(new Date('2026-01-01'));
  const [diaryEndDate, setDiaryEndDate] = useState(new Date('2026-04-30'));

  const [giveUpStartDate, setGiveUpStartDate] = useState(new Date('2026-01-01'));
  const [giveUpEndDate, setGiveUpEndDate] = useState(new Date('2026-04-30'));

  const { data: diaryData, isLoading: diaryLoading } = useDiaryStats({ startDate: diaryStartDate, endDate: diaryEndDate });
  const { data: giveUpData, isLoading: giveUpLoading } = useLetterGiveUpStats({ startDate: giveUpStartDate, endDate: giveUpEndDate });

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

        {diaryLoading ? <Spinner /> : (
          <>
            <div className="mb-4">
              <p className="text-sm text-neutral-600">전체 일기 수</p>
              <p className="text-2xl font-semibold text-neutral-950">
                {(diaryData?.totalDiaryCount ?? 0).toLocaleString()}건
              </p>
            </div>
            <DiaryTypeChart data={diaryData?.diaryTypeStats ?? []} />
          </>
        )}
      </StatisticsCard>

      <section className="rounded-[10px] border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-neutral-950">편지 답장 포기 현황</h2>

        <div className="mb-4">
          <ChartFilter
            startDate={giveUpStartDate}
            endDate={giveUpEndDate}
            onStartDateChange={setGiveUpStartDate}
            onEndDateChange={setGiveUpEndDate}
          />
        </div>

        {giveUpLoading ? <Spinner /> : giveUpData && <LetterGiveUpStatus data={giveUpData} />}
      </section>
    </div>
  );
}
