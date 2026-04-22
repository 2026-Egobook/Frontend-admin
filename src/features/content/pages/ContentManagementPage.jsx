import { useState } from 'react';
import ContentTabMenu from '../components/ContentTabMenu';
import DailyPraiseSection from '../components/DailyPraiseSection';
import useDailyPraiseStats from '../hooks/useDailyPraiseStats';
import { resendDailyPraiseFailures } from '../api/contentApi';

export default function ContentManagementPage() {
  const [activeTab, setActiveTab] = useState('dailyPraise');
  const [startDate, setStartDate] = useState(new Date('2026-04-01'));
  const [endDate, setEndDate] = useState(new Date('2026-04-09'));

  const { data, isLoading } = useDailyPraiseStats({
    startDate,
    endDate,
  });

  const handleResend = async (selectedLogs) => {
    const failureIds = selectedLogs.map((log) => log.failureId);

    if (failureIds.length === 0) return;

    await resendDailyPraiseFailures({ failureIds });
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold leading-8 text-neutral-950">콘텐츠 관리</h1>

      <ContentTabMenu activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'dailyPraise' && (
        <>
          {isLoading || !data ? (
            <div className="rounded-[10px] border border-neutral-200 bg-white px-6 py-10 text-sm text-neutral-500">
              데이터를 불러오는 중입니다.
            </div>
          ) : (
            <DailyPraiseSection
              data={data}
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              onResend={handleResend}
            />
          )}
        </>
      )}

      {activeTab === 'weeklyReport' && (
        <div className="rounded-[10px] border border-neutral-200 bg-white px-6 py-10 text-sm text-neutral-500">
          AI 주간 리포트 영역
        </div>
      )}

      {activeTab === 'letter' && (
        <div className="rounded-[10px] border border-neutral-200 bg-white px-6 py-10 text-sm text-neutral-500">
          편지 영역
        </div>
      )}

      {activeTab === 'badWord' && (
        <div className="rounded-[10px] border border-neutral-200 bg-white px-6 py-10 text-sm text-neutral-500">
          나쁜말 AI 영역
        </div>
      )}
    </div>
  );
}
