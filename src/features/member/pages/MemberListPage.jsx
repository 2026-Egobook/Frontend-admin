import { useRef, useEffect, useState } from 'react';
import MemberFilter from '../components/MemberFilter';
import MemberTable from '../components/MemberTable';
import { useMemberList } from '../hooks/useMemberList';
import Spinner from '@/shared/components/ui/Spinner';

function MemberListPage() {
  const [keyword, setKeyword] = useState('');
  const [submittedKeyword, setSubmittedKeyword] = useState('');
  const [status, setStatus] = useState('');

  const sentinelRef = useRef(null);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useMemberList({ keyword: submittedKeyword, status });

  const members = data?.pages.flatMap((p) => p.content) ?? [];

  const handleSearch = () => {
    setSubmittedKeyword(keyword);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setSubmittedKeyword(keyword);
  };

  const handleReset = () => {
    setKeyword('');
    setSubmittedKeyword('');
    setStatus('');
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
    <div className="flex flex-col gap-6 bg-white">
      <h1 className="text-2xl font-semibold leading-8 text-neutral-950">회원 관리</h1>

      <MemberFilter
        keyword={keyword}
        status={status}
        onKeywordChange={setKeyword}
        onStatusChange={handleStatusChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {isLoading ? (
        <Spinner />
      ) : (
        <MemberTable members={members} />
      )}

      <div ref={sentinelRef} className="h-1" />
      {isFetchingNextPage && <Spinner />}
    </div>
  );
}

export default MemberListPage;
