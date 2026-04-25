import DateRangeFilter from '../../../shared/components/ui/date-picker/DateRangeFilter';
import SendStatusCard from './SendStatusCard';
import FailureLogList from './FailureLogList';

export default function WeeklyReportSection({
  data,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onResend,
}) {
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-4 rounded-[10px] border border-neutral-200 bg-white px-6 pt-6 pb-4">
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
      </section>

      <FailureLogList logs={data.failureLogs} onResend={onResend} />
    </div>
  );
}
