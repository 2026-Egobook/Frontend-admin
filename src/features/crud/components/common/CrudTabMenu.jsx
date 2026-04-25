const tabs = [
  { key: 'psychology', label: '심리 지식' },
  { key: 'question', label: '질문 더미' },
  { key: 'item', label: '아이템' },
];

export default function CrudTabMenu({ activeTab, onChange }) {
  return (
    <div className="flex h-12 items-start gap-0 border-b border-neutral-200">
      {tabs.map((tab) => {
        const active = activeTab === tab.key;

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`flex h-12 items-center justify-center border-b-2 text-sm font-medium leading-5 ${
              active ? 'border-black text-neutral-950' : 'border-transparent text-neutral-600'
            } ${tab.key === 'item' ? 'w-20' : 'w-24'}`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
