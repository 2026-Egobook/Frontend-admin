function FilterGroup({ title, options, selectedValue, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm font-medium leading-5 text-neutral-950">{title}</div>

      <div className="flex gap-2">
        {options.map((option) => {
          const active = selectedValue === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`rounded px-5 py-2 text-sm font-medium leading-5 ${
                active
                  ? 'bg-black text-white'
                  : 'border border-neutral-300 bg-white text-neutral-700'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ReportFilterPanel({ contentType, onChangeContentType }) {
  return (
    <div className="flex flex-col gap-4 rounded-[10px] border border-neutral-200 bg-white px-6 pt-6 pb-4">
      <FilterGroup
        title="콘텐츠 유형"
        selectedValue={contentType}
        onChange={onChangeContentType}
        options={[
          { label: '전체', value: 'ALL' },
          { label: '편지', value: 'LETTER' },
          { label: '편지 답장', value: 'REPLY' },
          { label: '질문 답변', value: 'ANSWER' },
        ]}
      />
    </div>
  );
}
