import { FiSearch } from 'react-icons/fi';

function MemberFilter({ keyword, status, onKeywordChange, onStatusChange }) {
  const filters = [
    { label: '전체', value: 'ALL' },
    { label: '제재중', value: 'SUSPENDED' },
    { label: '탈퇴예정', value: 'WITHDRAW_PENDING' },
  ];

  return (
    <section className="flex flex-col gap-4 rounded-[10px] border border-neutral-200 bg-white p-6">
      <div className="relative">
        <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />

        <input
          type="text"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          placeholder="사용자 ID, 이메일, 닉네임으로 검색"
          className="h-11 w-full rounded border border-neutral-300 bg-white pl-11 pr-4 text-base text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-neutral-400"
        />
      </div>

      <div className="flex gap-2">
        {filters.map((filter) => {
          const isActive = status === filter.value;

          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => onStatusChange(filter.value)}
              className={`rounded px-5 py-2 text-sm font-medium leading-5 ${
                isActive
                  ? 'bg-black text-white'
                  : 'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default MemberFilter;
