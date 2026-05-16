import { FiSearch } from 'react-icons/fi';

const STATUS_FILTERS = [
  { label: '전체', value: '' },
  { label: '활동', value: 'ACTIVE' },
  { label: '휴면', value: 'DORMANT' },
  { label: '탈퇴대기', value: 'WITHDRAW_PENDING' },
  { label: '정지', value: 'SUSPENDED' },
];

function MemberFilter({ keyword, status, onKeywordChange, onStatusChange, onSearch, onReset }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSearch?.();
  };

  return (
    <section className="flex flex-col gap-4 rounded-[10px] border border-neutral-200 bg-white p-6">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="계정 코드, 이메일, 닉네임으로 검색"
            className="h-11 w-full rounded border border-neutral-300 bg-white pl-11 pr-4 text-base text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-neutral-400"
          />
        </div>

        <button
          type="button"
          onClick={onSearch}
          className="h-11 rounded bg-black px-5 text-sm font-medium text-white"
        >
          검색
        </button>

        <button
          type="button"
          onClick={onReset}
          className="h-11 rounded border border-neutral-300 px-5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
        >
          초기화
        </button>
      </div>

      <div className="flex gap-2">
        {STATUS_FILTERS.map((filter) => {
          const isActive = status === filter.value;
          return (
            <button
              key={filter.value || 'all'}
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
