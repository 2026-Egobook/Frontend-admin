import { useState } from 'react';
import DropdownSelect from '@/shared/components/ui/DropdownSelect';

const OPTIONS = [
  { label: '7일', value: 7 },
  { label: '14일', value: 14 },
  { label: '30일', value: 30 },
];

export default function RetentionCard({ data }) {
  const [selectedDays, setSelectedDays] = useState(data?.days ?? 7);

  if (!data) return null;

  return (
    <div className="w-full max-w-[552px] rounded-[10px] border border-neutral-200 bg-white p-6">
      <div className="mb-8 flex items-center justify-between">
        <p className="text-sm text-neutral-600">잔존율</p>

        <div className="w-28">
          <DropdownSelect
            value={selectedDays}
            options={OPTIONS}
            onChange={setSelectedDays}
          />
        </div>
      </div>

      <p className="mb-2 text-3xl font-semibold text-neutral-950">
        {data.rate}%
      </p>

      <p className="text-xs text-neutral-600">
        가입 후 {selectedDays}일 내 재방문 비율
      </p>
    </div>
  );
}