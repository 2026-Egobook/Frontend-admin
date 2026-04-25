import DateRangeFilter from '@/shared/components/ui/date-picker/DateRangeFilter';

function LetterStatCard({ label, value, danger = false }) {
  return (
    <div className="flex h-20 flex-1 flex-col rounded border border-neutral-200 bg-neutral-50 px-4 pt-4 pb-1">
      <div className="text-sm font-normal leading-5 text-neutral-600">{label}</div>
      <div
        className={`text-2xl font-semibold leading-8 ${
          danger ? 'text-red-600' : 'text-neutral-950'
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function LetterFailureLogItem({ log }) {
  return (
    <div className="flex flex-col rounded border border-neutral-200 bg-neutral-50 px-3 pt-3 pb-1">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="text-sm font-medium leading-5 text-neutral-950">
            로그 ID: {log.logId} | 편지 ID: {log.letterId}
          </div>
          <div className="text-xs font-normal leading-4 text-neutral-600">{log.failedAt}</div>
        </div>

        <div className="text-sm font-normal leading-5 text-red-600">{log.reason}</div>
      </div>
    </div>
  );
}

export default function LetterSection({
  data,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) {
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-4 rounded-[10px] border border-neutral-200 bg-white px-6 pt-6 pb-4">
        <h3 className="text-lg font-semibold leading-7 text-neutral-950">편지 현황</h3>

        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
        />

        <div className="grid grid-cols-4 gap-4">
          <LetterStatCard label="발송 완료 건수" value={data.summary.completedCount} />
          <LetterStatCard label="대기 중인 편지" value={data.summary.pendingCount} />
          <LetterStatCard label="AI 답장 발송 건수" value={data.summary.aiReplyCount} />
          <LetterStatCard label="발송 실패 건수" value={data.summary.failedCount} danger />
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-[10px] border border-neutral-200 bg-white px-6 pt-6 pb-4">
        <h3 className="text-lg font-semibold leading-7 text-neutral-950">발송 실패 로그</h3>

        <div className="flex flex-col gap-2">
          {data.failureLogs.map((log) => (
            <LetterFailureLogItem key={log.logId} log={log} />
          ))}
        </div>
      </section>
    </div>
  );
}
