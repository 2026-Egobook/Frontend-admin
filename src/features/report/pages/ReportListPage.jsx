import { useState } from 'react';
import ReportFilterPanel from '../components/ReportFilterPanel';
import ReportTable from '../components/ReportTable';
import useReportList from '../hooks/useReportList';

export default function ReportListPage() {
  const [contentType, setContentType] = useState('ALL');
  const [page, setPage] = useState(1);
  const size = 20;

  const { data, isLoading } = useReportList({ contentType, page, size });

  const reports = data?.content ?? [];
  const hasNext = data?.hasNext ?? false;

  const handleContentTypeChange = (value) => {
    setContentType(value);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold leading-8 text-neutral-950">신고 관리</h1>

      <ReportFilterPanel
        contentType={contentType}
        onChangeContentType={handleContentTypeChange}
      />

      {isLoading ? (
        <div className="rounded-[10px] border border-neutral-200 bg-white px-6 py-10 text-sm text-neutral-500">
          신고 목록을 불러오는 중입니다.
        </div>
      ) : (
        <ReportTable reports={reports} />
      )}

      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
          className="rounded border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700 disabled:cursor-not-allowed disabled:text-neutral-300"
        >
          이전
        </button>
        <span className="text-sm text-neutral-600">{page} 페이지</span>
        <button
          type="button"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!hasNext}
          className="rounded border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700 disabled:cursor-not-allowed disabled:text-neutral-300"
        >
          다음
        </button>
      </div>
    </div>
  );
}
