import DateRangeFilter from './DateRangeFilter';
import SendStatusCard from './SendStatusCard';
import FailureLogList from './FailureLogList';

function DailyStatsTable({ rows = [] }) {
  return (
    <div className="overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr className="h-9 border-b border-neutral-200 bg-neutral-50">
            <th className="px-4 text-left text-sm font-bold leading-5 text-neutral-950">날짜</th>
            <th className="px-4 text-right text-sm font-bold leading-5 text-neutral-950">예정</th>
            <th className="px-4 text-right text-sm font-bold leading-5 text-neutral-950">완료</th>
            <th className="px-4 text-right text-sm font-bold leading-5 text-neutral-950">실패</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.date} className="h-9 border-b border-neutral-100">
              <td className="px-4 text-sm font-normal leading-5 text-neutral-950">{row.date}</td>
              <td className="px-4 text-right text-sm font-normal leading-5 text-neutral-950">
                {row.scheduledCount}
              </td>
              <td className="px-4 text-right text-sm font-normal leading-5 text-neutral-950">
                {row.completedCount}
              </td>
              <td className="px-4 text-right text-sm font-normal leading-5 text-red-600">
                {row.failedCount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DailyPraiseSection({
  data,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onResend,
}) {
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-4 rounded-[10px] border border-neutral-200 bg-white p-6">
        <h3 className="text-lg font-semibold leading-7 text-neutral-950">발송 현황</h3>

        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
        />

        <div className="flex gap-5">
          <SendStatusCard label="발송 완료 건수" value={data.summary.completedCount} />
          <SendStatusCard label="발송 실패 건수" value={data.summary.failedCount} danger />
          <SendStatusCard label="발송 예정 건수" value={data.summary.scheduledCount} />
        </div>

        <div className="text-sm font-medium leading-5 text-neutral-950">날짜별 통계</div>

        <DailyStatsTable rows={data.dailyStats} />
      </section>

      <FailureLogList logs={data.failureLogs} onResend={onResend} />
    </div>
  );
}
