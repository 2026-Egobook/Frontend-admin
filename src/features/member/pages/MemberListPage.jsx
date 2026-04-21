import { useState } from 'react';
import MemberFilter from '../components/MemberFilter';
import MemberTable from '../components/MemberTable';
import { useMemberList } from '../hooks/useMemberList';

function MemberListPage() {
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('ALL');

  const { data: members = [], isLoading } = useMemberList({
    keyword,
    status,
  });

  return (
    <div className="flex flex-col gap-6 bg-white">
      <h1 className="text-[36px] font-semibold leading-[44px] text-neutral-950">회원 관리</h1>

      <MemberFilter
        keyword={keyword}
        status={status}
        onKeywordChange={setKeyword}
        onStatusChange={setStatus}
      />

      {isLoading ? (
        <div className="rounded-[10px] border border-neutral-200 bg-white px-6 py-10 text-sm text-neutral-500">
          회원 목록을 불러오는 중입니다.
        </div>
      ) : (
        <MemberTable members={members} />
      )}
    </div>
  );
}

export default MemberListPage;
