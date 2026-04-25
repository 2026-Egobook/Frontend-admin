import { useState } from 'react';
import BaseModal from '@/shared/components/ui/BaseModal';

export default function RejectReportModal({ open, onClose, onSubmit }) {
  const [reason, setReason] = useState('');

  const handleClose = () => {
    setReason('');
    onClose?.();
  };

  const handleSubmit = () => {
    onSubmit?.({ reason });
    setReason('');
  };

  return (
    <BaseModal open={open} onClose={handleClose} className="max-w-[480px]">
      <div className="flex flex-col gap-4 rounded-[10px] bg-white px-6 py-6">
        <h3 className="text-lg font-semibold leading-7 text-neutral-950">신고 반려</h3>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium leading-5 text-neutral-950">반려 사유</label>

          <textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="신고 반려 사유를 입력하세요"
            className="h-24 resize-none rounded border border-neutral-300 px-3 py-2 text-base text-neutral-950 outline-none placeholder:text-neutral-950/50 focus:border-black"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            className="h-10 flex-1 rounded bg-red-600 text-base font-medium leading-6 text-white"
          >
            반려 처리
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