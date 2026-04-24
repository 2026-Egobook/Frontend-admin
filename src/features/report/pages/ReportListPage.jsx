import { useState } from 'react';
import ReportFilterPanel from '../components/ReportFilterPanel';
import ReportTable from '../components/ReportTable';
import useReportList from '../hooks/useReportList';

export default function ReportListPage() {
  const [contentType, setContentType] = useState('ALL');
  const [status, setStatus] = useState('ALL');
  const [sort, setSort] = useState('LATEST');

  const { data: reports = [], isLoading } = useReportList({
    contentType,
    status,
    sort,
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold leading-8 text-neutral-950">신고 관리</h1>

      <ReportFilterPanel
        contentType={contentType}
        status={status}
        sort={sort}
        onChangeContentType={setContentType}
        onChangeStatus={setStatus}
        onChangeSort={setSort}
      />

      {isLoading ? (
        <div className="rounded-[10px] border border-neutral-200 bg-white px-6 py-10 text-sm text-neutral-500">
          신고 목록을 불러오는 중입니다.
        </div>
      ) : (
        <ReportTable reports={reports} />
      )}
    </div>
  );
}