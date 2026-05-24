import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ContentTabMenu from '../components/common/ContentTabMenu';
import DailyPraiseSection from '../components/daily-praise/DailyPraiseSection';
import WeeklyReportSection from '../components/weekly-report/WeeklyReportSection';
import LetterSection from '../components/badword-ai/LetterSection';
import BadWordAiSection from '../components/badword-ai/BadWordAiSection';
import useDailyPraiseStats from '../hooks/useDailyPraiseStats';
import useWeeklyReportStats from '../hooks/useWeeklyReportStats';
import useLetterStats from '../hooks/useLetterStats';
import useBadWordStats from '../hooks/useBadWordStats';
import { resendDailyPraiseFailures, resendWeeklyReportFailures } from '../api/contentApi';

export default function ContentManagementPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') ?? 'weeklyReport';
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 6);

  const [startDate, setStartDate] = useState(sevenDaysAgo);
  const [endDate, setEndDate] = useState(today);

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

  const [badWordType, setBadWordType] = useState('ALL');

  const { data: badWordData, isLoading: isBadWordLoading } = useBadWordStats({
    startDate,
    endDate,
    type: badWordType,
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold leading-8 text-neutral-950">콘텐츠 관리</h1>

      <ContentTabMenu activeTab={activeTab} onChange={(tab) => setSearchParams({ tab })} />

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
        <>
          {isBadWordLoading || !badWordData ? (
            <div className="rounded-[10px] border border-neutral-200 bg-white px-6 py-10 text-sm text-neutral-500">
              데이터를 불러오는 중입니다.
            </div>
          ) : (
            <BadWordAiSection
              data={badWordData}
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              type={badWordType}
              onTypeChange={setBadWordType}
            />
          )}
        </>
      )}
    </div>
  );
}
