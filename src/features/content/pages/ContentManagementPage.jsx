import { useState } from 'react';
import ContentTabMenu from '../components/ContentTabMenu';
import DailyPraiseSection from '../components/DailyPraiseSection';
import WeeklyReportSection from '../components/WeeklyReportSection';
import LetterSection from '../components/LetterSection';
import useDailyPraiseStats from '../hooks/useDailyPraiseStats';
import useWeeklyReportStats from '../hooks/useWeeklyReportStats';
import useLetterStats from '../hooks/useLetterStats';
import { resendDailyPraiseFailures, resendWeeklyReportFailures } from '../api/contentApi';

export default function ContentManagementPage() {
  const [activeTab, setActiveTab] = useState('weeklyReport');
  const [startDate, setStartDate] = useState(new Date('2026-04-01'));
  const [endDate, setEndDate] = useState(new Date('2026-04-09'));

  const { data: dailyPraiseData, isLoading: isDailyPraiseLoading } = useDailyPraiseStats({
    startDate,
    endDate,
  });

  const { data: weeklyReportData, isLoading: isWeeklyReportLoading } = useWeeklyReportStats({
    startDate,
    endDate,
  });

  const handleResendDailyPraise = async (selectedLogs) => {
    const failureIds = selectedLogs.map((log) => log.failureId);

    if (failureIds.length === 0) return;

    await resendDailyPraiseFailures({ failureIds });
  };

  const handleResendWeeklyReport = async (selectedLogs) => {
    const failureIds = selectedLogs.map((log) => log.failureId);

    if (failureIds.length === 0) return;

    await resendWeeklyReportFailures({ failureIds });
  };

  const { data: letterData, isLoading: isLetterLoading } = useLetterStats({
    startDate,
    endDate,
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold leading-8 text-neutral-950">콘텐츠 관리</h1>

      <ContentTabMenu activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'dailyPraise' && (
        <>
          {isDailyPraiseLoading || !dailyPraiseData ? (
            <div className="rounded-[10px] border border-neutral-200 bg-white px-6 py-10 text-sm text-neutral-500">
              데이터를 불러오는 중입니다.
            </div>
          ) : (
            <DailyPraiseSection
              data={dailyPraiseData}
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              onResend={handleResendDailyPraise}
            />
          )}
        </>
      )}

      {activeTab === 'weeklyReport' && (
        <>
          {isWeeklyReportLoading || !weeklyReportData ? (
            <div className="rounded-[10px] border border-neutral-200 bg-white px-6 py-10 text-sm text-neutral-500">
              데이터를 불러오는 중입니다.
            </div>
          ) : (
            <WeeklyReportSection
              data={weeklyReportData}
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              onResend={handleResendWeeklyReport}
            />
          )}
        </>
      )}

      {activeTab === 'letter' && (
        <>
          {isLetterLoading || !letterData ? (
            <div className="rounded-[10px] border border-neutral-200 bg-white px-6 py-10 text-sm text-neutral-500">
              데이터를 불러오는 중입니다.
            </div>
          ) : (
            <LetterSection
              data={letterData}
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
            />
          )}
        </>
      )}

      {activeTab === 'badWord' && (
        <div className="rounded-[10px] border border-neutral-200 bg-white px-6 py-10 text-sm text-neutral-500">
          나쁜말 AI 영역
        </div>
      )}
    </div>
  );
}
