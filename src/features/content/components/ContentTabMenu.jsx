const tabs = [
  { key: 'dailyPraise', label: 'AI 일간 칭찬서', widthClass: 'w-40' },
  { key: 'weeklyReport', label: 'AI 주간 리포트', widthClass: 'w-40' },
  { key: 'letter', label: '편지', widthClass: 'w-24' },
  { key: 'badWord', label: '나쁜말 AI', widthClass: 'w-28' },
];

export default function ContentTabMenu({ activeTab, onChange }) {
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
            } ${tab.widthClass}`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
