import { useEffect, useRef, useState } from 'react';
import ReportFilterPanel from '../components/ReportFilterPanel';
import ReportTable from '../components/ReportTable';
import useReportList from '../hooks/useReportList';
import Spinner from '@/shared/components/ui/Spinner';

export default function ReportListPage() {
  const [contentType, setContentType] = useState('ALL');
  const sentinelRef = useRef(null);

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useReportList({ contentType });

  const reports = data?.pages.flatMap((page) => page.content) ?? [];

  const handleContentTypeChange = (value) => {
    setContentType(value);
  };

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold leading-8 text-neutral-950">신고 관리</h1>

      <ReportFilterPanel
        contentType={contentType}
        onChangeContentType={handleContentTypeChange}
      />

      {isLoading ? (
        <Spinner />
      ) : (
        <ReportTable reports={reports} />
      )}

      <div ref={sentinelRef} className="h-1" />

      {isFetchingNextPage && <Spinner />}
    </div>
  );
}
