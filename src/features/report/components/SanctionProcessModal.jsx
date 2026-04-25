import { useState } from 'react';
import BaseModal from '@/shared/components/ui/BaseModal';

export default function SanctionProcessModal({ open, onClose, onSubmit }) {
  const [days, setDays] = useState('7');
  const [reason, setReason] = useState('');

  const handleClose = () => {
    setDays('7');
    setReason('');
    onClose?.();
  };

  const handleSubmit = () => {
    onSubmit?.({
      days: Number(days),
      reason,
    });
    setReason('');
  };

  return (
    <BaseModal open={open} onClose={handleClose} className="max-w-[480px]">
      <div className="flex flex-col gap-4 rounded-[10px] bg-white px-6 py-6">
        <h3 className="text-lg font-semibold leading-7 text-neutral-950">제재 처리</h3>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium leading-5 text-neutral-950">제재 기간 (일)</label>

            <input
              value={days}
              onChange={(event) => setDays(event.target.value)}
              className="h-10 rounded border border-neutral-300 px-3 text-base text-neutral-950 outline-none focus:border-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium leading-5 text-neutral-950">제재 사유</label>

            <textarea
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="제재 사유를 입력하세요"
              className="h-24 resize-none rounded border border-neutral-300 px-3 py-2 text-base text-neutral-950 outline-none placeholder:text-neutral-950/50 focus:border-black"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            className="h-10 flex-1 rounded bg-black text-base font-medium leading-6 text-white"
          >
            제재 처리
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="h-10 flex-1 rounded border border-neutral-300 bg-white text-base font-medium leading-6 text-neutral-950"
          >
            취소
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
