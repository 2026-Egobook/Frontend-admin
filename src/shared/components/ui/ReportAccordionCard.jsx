import { useState } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import StatusChip from './StatusChip';

function ReportDetailRow({ item, onProcess }) {
  const typeTone = item.type === '신고함' ? 'blue' : 'orange';
  const statusTone =
    item.status === 'RESOLVED' ? 'green' : item.status === 'REFUSED' ? 'red' : 'yellow';

  return (
    <div className="rounded border border-neutral-200 bg-neutral-50 px-2 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <StatusChip tone={typeTone}>{item.type}</StatusChip>
            <span className="text-xs font-normal leading-4 text-neutral-600">
              ID: {item.reportId}
            </span>
          </div>

          <div className="mt-1 text-xs font-normal leading-4 text-neutral-600">
            사유: {item.reason}
          </div>

          <div className="mt-1 text-xs font-normal leading-4 text-neutral-500">
            {item.createdAt}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <StatusChip tone={statusTone}>{item.status}</StatusChip>

          {item.status === 'PENDING' && (
            <button
              type="button"
              onClick={() => onProcess?.(item)}
              className="rounded bg-black px-2 py-1 text-xs font-medium text-white"
            >
              처리
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ReportAccordionCard({
  title,
  totalCount,
  summaryStatus,
  items = [],
  defaultOpen = true,
  onProcess,
}) {
  const [open, setOpen] = useState(defaultOpen);

  const summaryTone =
    summaryStatus === '처리 대기중' ? 'yellow' : summaryStatus === '처리 완료' ? 'green' : 'gray';

  return (
    <div className="overflow-hidden rounded border border-neutral-200">
      <div className="flex items-center justify-between bg-neutral-50 px-3 py-3">
        <div className="flex-1">
          <div className="truncate text-sm font-medium leading-5 text-neutral-950">{title}</div>
          <div className="text-xs font-medium leading-4 text-neutral-600">
            누적 신고 수: {totalCount}회
          </div>
        </div>

        <div className="ml-4 flex items-center gap-2">
          {summaryStatus ? <StatusChip tone={summaryTone}>{summaryStatus}</StatusChip> : null}

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="text-neutral-600"
          >
            {open ? <FiChevronUp className="h-4 w-4" /> : <FiChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="flex flex-col gap-2 border-t border-neutral-200 bg-white px-3 py-3">
          {items.map((item) => (
            <ReportDetailRow key={item.reportId} item={item} onProcess={onProcess} />
          ))}
        </div>
      )}
    </div>
  );
}
