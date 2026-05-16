import { useState } from 'react';

export default function ReportMemoForm({ initialMemo = '', onSave }) {
  const [memo, setMemo] = useState(initialMemo);

  return (
    <section className="flex flex-col gap-4 border-t border-neutral-200 pt-6">
      <h3 className="text-lg font-semibold leading-7 text-neutral-950">처리 메모</h3>

      <textarea
        value={memo}
        onChange={(event) => setMemo(event.target.value)}
        placeholder="(내부 관리용)"
        className="h-24 w-full rounded border border-neutral-300 px-3 py-2 text-base text-neutral-950 outline-none placeholder:text-neutral-950/50 focus:border-black"
      />

      <button
        type="button"
        onClick={() => onSave?.(memo)}
        className="h-10 w-24 rounded bg-black text-base font-medium leading-6 text-white"
      >
        메모 저장
      </button>
    </section>
  );
}
