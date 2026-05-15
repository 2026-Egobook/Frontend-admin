import StatusChip from '@/shared/components/ui/StatusChip';

const DOMAIN_TYPE_LABEL = {
  LETTER: '편지',
  LETTER_REPLY: '편지 답장',
  QUESTION_ANSWER: '질문 답변',
};

const REASON_LABEL = {
  ABUSE: '비속어 및 모욕',
  SPAM: '광고 및 스팸',
  INAPPROPRIATE: '부적절한 콘텐츠',
  OTHER: '기타',
};

const REPORT_TYPE_LABEL = {
  REPORTER: '신고함',
  REPORTED: '신고받음',
};

const STATUS_TONE = {
  PENDING: 'yellow',
  RESOLVED: 'green',
  REFUSED: 'red',
};

const STATUS_LABEL = {
  PENDING: '대기중',
  RESOLVED: '처리 완료',
  REFUSED: '처리 반려',
};

function ReportRow({ report }) {
  return (
    <div className="rounded border border-neutral-200 bg-neutral-50 px-3 py-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <StatusChip tone={report.reportType === 'REPORTER' ? 'blue' : 'orange'}>
              {REPORT_TYPE_LABEL[report.reportType] ?? report.reportType}
            </StatusChip>
            <span className="text-xs text-neutral-500">
              {DOMAIN_TYPE_LABEL[report.reportDomainType] ?? report.reportDomainType}
            </span>
            <span className="text-xs text-neutral-500">ID: {report.reportId}</span>
          </div>

          <div className="mt-1 text-xs text-neutral-600">
            사유: {REASON_LABEL[report.reportReason] ?? report.reportReason}
          </div>

          {report.content && (
            <div className="mt-1 text-xs text-neutral-700 line-clamp-2">{report.content}</div>
          )}

          <div className="mt-1 text-xs text-neutral-500">{report.createdAt}</div>
        </div>

        <StatusChip tone={STATUS_TONE[report.reportStatus] ?? 'gray'}>
          {STATUS_LABEL[report.reportStatus] ?? report.reportStatus}
        </StatusChip>
      </div>
    </div>
  );
}

export default function ReportHistorySection({
  summary,
  reports = [],
  hasNext = false,
  page = 1,
  reportDomainType,
  reportType,
  isLoading,
  onPageChange,
  onReportDomainTypeChange,
  onReportTypeChange,
}) {
  return (
    <section className="flex flex-col gap-4 border-t border-neutral-200 pt-6">
      <h2 className="text-lg font-semibold leading-7 text-neutral-950">신고 이력</h2>

      <div className="grid grid-cols-3 gap-4 rounded border border-neutral-200 bg-neutral-50 p-3">
        <div>
          <div className="text-sm font-normal leading-5 text-neutral-600">신고한 누적 횟수</div>
          <div className="text-sm font-semibold leading-5 text-neutral-950">
            {summary?.totalReportCount ?? '-'}회
          </div>
        </div>

        <div>
          <div className="text-sm font-normal leading-5 text-neutral-600">신고당한 누적 횟수</div>
          <div className="text-sm font-semibold leading-5 text-neutral-950">
            {summary?.totalReportedCount ?? '-'}회
          </div>
        </div>

        <div>
          <div className="text-sm font-normal leading-5 text-neutral-600">과거 계정 정지 횟수</div>
          <div className="text-sm font-semibold leading-5 text-neutral-950">
            {summary?.pastSuspendedCount ?? '-'}회
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium leading-5 text-neutral-950">도메인</div>
          <div className="flex gap-2">
            {[
              { label: '편지', value: 'LETTER' },
              { label: '편지 답장', value: 'LETTER_REPLY' },
              { label: '질문 답변', value: 'QUESTION_ANSWER' },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onReportDomainTypeChange?.(option.value)}
                className={`rounded px-4 py-2 text-sm font-medium ${
                  reportDomainType === option.value
                    ? 'bg-black text-white'
                    : 'border border-neutral-300 bg-white text-neutral-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium leading-5 text-neutral-950">신고 유형</div>
          <div className="flex gap-2">
            {[
              { label: '전체', value: null },
              { label: '신고받음', value: 'REPORTED' },
              { label: '신고함', value: 'REPORTER' },
            ].map((option) => (
              <button
                key={String(option.value)}
                type="button"
                onClick={() => onReportTypeChange?.(option.value)}
                className={`rounded px-4 py-2 text-sm font-medium ${
                  reportType === option.value
                    ? 'bg-black text-white'
                    : 'border border-neutral-300 bg-white text-neutral-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="py-6 text-center text-sm text-neutral-500">신고 이력을 불러오는 중입니다.</div>
      ) : reports.length === 0 ? (
        <div className="py-6 text-center text-sm text-neutral-500">신고 이력이 없습니다.</div>
      ) : (
        <div className="flex flex-col gap-2">
          {reports.map((report) => (
            <ReportRow key={report.reportId} report={report} />
          ))}
        </div>
      )}

      {(page > 1 || hasNext) && (
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => onPageChange?.(page - 1)}
            disabled={page === 1}
            className="rounded border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700 disabled:cursor-not-allowed disabled:text-neutral-300"
          >
            이전
          </button>

          <span className="text-sm text-neutral-600">{page} 페이지</span>

          <button
            type="button"
            onClick={() => onPageChange?.(page + 1)}
            disabled={!hasNext}
            className="rounded border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700 disabled:cursor-not-allowed disabled:text-neutral-300"
          >
            다음
          </button>
        </div>
      )}
    </section>
  );
}
