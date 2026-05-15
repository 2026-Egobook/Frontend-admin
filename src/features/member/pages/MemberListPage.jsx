import { useState } from 'react';
import MemberFilter from '../components/MemberFilter';
import MemberTable from '../components/MemberTable';
import { useMemberList } from '../hooks/useMemberList';

function MemberListPage() {
  const [keyword, setKeyword] = useState('');
  const [submittedKeyword, setSubmittedKeyword] = useState('');
  const [status, setStatus] = useState('ACTIVE');
  const [page, setPage] = useState(1);
  const size = 5;

  const { data, isLoading } = useMemberList({ keyword: submittedKeyword, status, page, size });

  const members = data?.content ?? [];
  const hasNext = data?.hasNext ?? false;

  const handleSearch = () => {
    setSubmittedKeyword(keyword);
    setPage(1);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-6 bg-white">
      <h1 className="text-2xl font-semibold leading-8 text-neutral-950">회원 관리</h1>

      <MemberFilter
        keyword={keyword}
        status={status}
        onKeywordChange={setKeyword}
        onStatusChange={handleStatusChange}
        onSearch={handleSearch}
      />

      {isLoading ? (
        <div className="rounded-[10px] border border-neutral-200 bg-white px-6 py-10 text-sm text-neutral-500">
          회원 목록을 불러오는 중입니다.
        </div>
      ) : (
        <MemberTable members={members} />
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

export default MemberListPage;
