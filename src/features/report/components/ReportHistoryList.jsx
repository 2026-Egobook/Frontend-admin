import ReportStatusBadge from './ReportStatusBadge';

export default function ReportHistoryList({ reports = [], onProcess }) {
  return (
    <section className="flex flex-col gap-4 border-t border-neutral-200 pt-6">
      <h3 className="text-lg font-semibold leading-7 text-neutral-950">
        신고 내역 ({reports.length}건)
      </h3>

      <div className="flex flex-col gap-2">
        {reports.map((report) => (
          <div
            key={report.reportId}
            className="flex items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-6 py-3"
          >
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium leading-5 text-neutral-950">
                  신고 ID: {report.reportId}
                </div>
                <div className="rounded bg-blue-100 px-2 py-1 text-xs font-normal leading-4 text-blue-800">
                  {report.reason}
                </div>
              </div>

              <div className="text-sm leading-5">
                <span className="text-neutral-600">신고자:</span>
                <span className="text-neutral-950"> {report.reporterNickname}</span>
              </div>

              <div className="text-sm leading-5 text-neutral-600">
                <span className="font-medium">상세 사유:</span> {report.detailReason}
              </div>
            </div>

            <div className="flex min-w-[180px] flex-col items-end gap-9">
              <div className="whitespace-nowrap text-xs font-normal leading-4 text-neutral-600">
                {report.createdAt}
              </div>

              {report.status === 'PENDING' ? (
                <div className="flex items-center gap-2">
                  <ReportStatusBadge status={report.status} label={report.statusLabel} />
                  <button
                    type="button"
                    onClick={() => onProcess(report)}
                    className="rounded bg-black px-2 py-1 text-xs font-medium leading-4 text-white"
                  >
                    처리
                  </button>
                </div>
              ) : (
                <ReportStatusBadge status={report.status} label={report.statusLabel} />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
