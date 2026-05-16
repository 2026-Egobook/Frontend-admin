import { useState } from 'react';

const DOMAIN_LABEL = {
  LETTER: '편지',
  LETTER_REPLY: '편지 답장',
  QUESTION_ANSWER: '질문 답변',
};

const DOMAIN_ORDER = ['LETTER', 'LETTER_REPLY', 'QUESTION_ANSWER'];

const REASON_LABEL = {
  ABUSE: '비속어 및 모욕',
  SPAM: '광고 및 스팸',
  INAPPROPRIATE: '부적절한 콘텐츠',
  OTHER: '기타',
};

const REPORT_TYPE_LABEL = { REPORTER: '신고함', REPORTED: '신고받음' };
const STATUS_LABEL = { PENDING: 'PENDING', RESOLVED: 'RESOLVED', REFUSED: 'REFUSED' };

const STATUS_BADGE = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  RESOLVED: 'bg-green-100 text-green-800',
  REFUSED: 'bg-red-100 text-red-800',
};

const REPORT_TYPE_BADGE = {
  REPORTER: 'bg-blue-100 text-blue-800',
  REPORTED: 'bg-orange-100 text-orange-800',
};

function hasPending(reports) {
  return reports.some((r) => r.reportStatus === 'PENDING');
}

function ContentGroup({ group, isExpanded, onToggle, onProcess }) {
  const pending = hasPending(group.reports);

  return (
    <div className="overflow-hidden rounded border border-neutral-200">
      <div className="flex items-center justify-between gap-4 bg-neutral-50 px-3 py-3">
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium text-neutral-950">{group.content || '-'}</div>
          <div className="mt-0.5 text-xs font-medium text-neutral-600">
            누적 신고 수: {group.reports.length}회
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span
            className={`rounded px-2 py-0.5 text-xs font-medium ${
              pending ? 'bg-yellow-100 text-yellow-800' : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            {pending ? '처리 대기중' : '처리완료'}
          </span>
          <button
            type="button"
            onClick={onToggle}
            className="text-base font-medium text-neutral-600"
          >
            {isExpanded ? '▲' : '▼'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="flex flex-col gap-2 border-t border-neutral-200 bg-white px-3 pt-3 pb-3">
          {group.reports.map((report) => (
            <div
              key={report.reportId}
              className="rounded border border-neutral-200 bg-neutral-50 px-2 pt-2 pb-2"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded px-2 py-0.5 text-xs font-normal ${
                        REPORT_TYPE_BADGE[report.reportType] ?? 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {REPORT_TYPE_LABEL[report.reportType] ?? report.reportType}
                    </span>
                    <span className="text-xs text-neutral-600">ID: {report.reportId}</span>
                  </div>
                  <div className="mt-1 text-xs text-neutral-600">
                    사유: {REASON_LABEL[report.reportReason] ?? report.reportReason}
                  </div>
                  <div className="mt-0.5 text-xs text-neutral-500">{report.createdAt}</div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-normal ${
                      STATUS_BADGE[report.reportStatus] ?? 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    {STATUS_LABEL[report.reportStatus] ?? report.reportStatus}
                  </span>
                  {report.reportStatus === 'PENDING' && (
                    <button
                      type="button"
                      onClick={() => onProcess(report)}
                      className="rounded bg-black px-2 py-1 text-xs font-medium text-white"
                    >
                      처리
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ReportHistorySection({
  summary,
  groupedReports = [],
  reportType,
  onReportTypeChange,
  isLoading,
  onProcess,
}) {
  const [collapsed, setCollapsed] = useState(new Set());

  const toggleExpand = (key) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const byDomain = DOMAIN_ORDER.reduce((acc, type) => {
    const items = groupedReports.filter((g) => g.domainType === type);
    if (items.length > 0) acc[type] = items;
    return acc;
  }, {});

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

      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium leading-5 text-neutral-950">필터</div>
        <div className="flex gap-2">
          {[
            { label: '신고받음', value: 'REPORTED' },
            { label: '신고함', value: 'REPORTER' },
          ].map((option) => (
            <button
              key={option.value}
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

      {isLoading ? (
        <div className="py-6 text-center text-sm text-neutral-500">신고 이력을 불러오는 중입니다.</div>
      ) : groupedReports.length === 0 ? (
        <div className="py-6 text-center text-sm text-neutral-500">신고 이력이 없습니다.</div>
      ) : (
        <div className="flex flex-col gap-4">
          {Object.entries(byDomain).map(([domainType, groups]) => (
            <div key={domainType} className="flex flex-col gap-2">
              <div className="text-sm font-medium leading-5 text-neutral-950">
                {DOMAIN_LABEL[domainType] ?? domainType}
              </div>
              {groups.map((group) => (
                <ContentGroup
                  key={group.key}
                  group={group}
                  isExpanded={!collapsed.has(group.key)}
                  onToggle={() => toggleExpand(group.key)}
                  onProcess={onProcess}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
