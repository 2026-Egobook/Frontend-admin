const tabs = [
  { key: 'user', label: '사용자 지표' },
  { key: 'content', label: '콘텐츠 지표' },
  { key: 'currency', label: '재화 모니터' },
  { key: 'withdrawal', label: '탈퇴 사유' },
];

export default function StatisticsTabMenu({ activeTab, onChange }) {
  return (
    <div className="flex h-12 items-start gap-2 border-b border-neutral-200">
      {tabs.map((tab) => {
        const active = activeTab === tab.key;

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`h-12 border-b-2 px-5 text-sm font-medium leading-5 ${
              active ? 'border-black text-neutral-950' : 'border-transparent text-neutral-600'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}