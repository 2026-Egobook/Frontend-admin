import { useMemo, useState } from 'react';

function FailureLogRow({ log, checked, onToggle }) {
  return (
    <div className="flex h-16 items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => onToggle(log.failureId)}
          className={`h-4 w-4 border border-black ${checked ? 'bg-black' : 'bg-white'}`}
        />
        <div className="flex flex-col">
          <div className="text-sm font-medium leading-5 text-neutral-950">
            실패 ID: {log.failureId} | 유저 ID: {log.userId}
          </div>
          <div className="text-xs font-normal leading-4 text-neutral-600">{log.failedAt}</div>
        </div>
      </div>

      <div className="text-sm font-normal leading-5 text-red-600">{log.reason}</div>
    </div>
  );
}

export default function FailureLogList({ logs = [], onResend }) {
  const [checkedIds, setCheckedIds] = useState(
    logs.filter((log) => log.checked).map((log) => log.failureId)
  );

  const selectedCount = checkedIds.length;

  const toggleCheck = (failureId) => {
    setCheckedIds((prev) =>
      prev.includes(failureId) ? prev.filter((id) => id !== failureId) : [...prev, failureId]
    );
  };

  const selectedLogs = useMemo(
    () => logs.filter((log) => checkedIds.includes(log.failureId)),
    [logs, checkedIds]
  );

  const handleResend = () => {
    onResend?.(selectedLogs);
  };

  return (
    <section className="flex flex-col gap-4 rounded-[10px] border border-neutral-200 bg-white px-6 pt-6 pb-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold leading-7 text-neutral-950">발송 실패 로그</h3>

        <button
          type="button"
          onClick={handleResend}
          disabled={selectedCount === 0}
          className="rounded bg-black px-5 py-2 text-sm font-medium leading-5 text-white disabled:cursor-not-allowed disabled:bg-neutral-300"
        >
          수동 재발송 ({selectedCount})
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {logs.map((log) => (
          <FailureLogRow
            key={log.failureId}
            log={log}
            checked={checkedIds.includes(log.failureId)}
            onToggle={toggleCheck}
          />
        ))}
      </div>
    </section>
  );
}
