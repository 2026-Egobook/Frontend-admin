import { useMemo, useState } from 'react';
import ReportAccordionCard from '@/shared/components/ui/ReportAccordionCard';

export default function ReportHistorySection({
  reportSummary,
  reportsReceived,
  reportsSent,
  onProcessReport,
}) {
  const [filter, setFilter] = useState('RECEIVED');

  const visibleGroups = useMemo(() => {
    return filter === 'RECEIVED' ? reportsReceived : reportsSent;
  }, [filter, reportsReceived, reportsSent]);

  return (
    <section className="flex flex-col gap-4 border-t border-neutral-200 pt-6">
      <h2 className="text-lg font-semibold leading-7 text-neutral-950">신고 이력</h2>

      <div className="grid grid-cols-3 gap-4 rounded border border-neutral-200 bg-neutral-50 p-3">
        <div>
          <div className="text-sm font-normal leading-5 text-neutral-600">신고한 누적 횟수</div>
          <div className="text-sm font-semibold leading-5 text-neutral-950">
            {reportSummary.reportedCount}
          </div>
        </div>

        <div>
          <div className="text-sm font-normal leading-5 text-neutral-600">신고당한 누적 횟수</div>
          <div className="text-sm font-semibold leading-5 text-neutral-950">
            {reportSummary.receivedCount}
          </div>
        </div>

        <div>
          <div className="text-sm font-normal leading-5 text-neutral-600">과거 계정 정지 횟수</div>
          <div className="text-sm font-semibold leading-5 text-neutral-950">
            {reportSummary.suspensionCount}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium leading-5 text-neutral-950">필터</div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setFilter('RECEIVED')}
            className={`rounded px-4 py-2 text-sm font-medium ${
              filter === 'RECEIVED'
                ? 'bg-black text-white'
                : 'border border-neutral-300 bg-white text-neutral-700'
            }`}
          >
            신고받음
          </button>

          <button
            type="button"
            onClick={() => setFilter('SENT')}
            className={`rounded px-4 py-2 text-sm font-medium ${
              filter === 'SENT'
                ? 'bg-black text-white'
                : 'border border-neutral-300 bg-white text-neutral-700'
            }`}
          >
            신고함
          </button>
        </div>
      </div>

      {visibleGroups.map((group) => (
        <div key={`${filter}-${group.category}-${group.title}`} className="flex flex-col gap-2">
          <div className="text-sm font-medium leading-5 text-neutral-950">{group.category}</div>

          <ReportAccordionCard
            title={group.title}
            totalCount={group.totalCount}
            summaryStatus={group.summaryStatus}
            items={group.items}
            defaultOpen
            onProcess={onProcessReport}
          />
        </div>
      ))}
    </section>
  );
}
