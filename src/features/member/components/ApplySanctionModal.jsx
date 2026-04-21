import { useState } from 'react';
import BaseModal from '@/shared/components/ui/BaseModal';
import DropdownSelect from '@/shared/components/ui/DropdownSelect';
import Input from '@/shared/components/ui/Input';

export default function ApplySanctionModal({ open, onClose, onSubmit }) {
  const [domain, setDomain] = useState('');
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');

  const domainOptions = [
    { label: '편지', value: 'LETTER' },
    { label: '질문 답변', value: 'QUESTION' },
  ];

  const handleClose = () => {
    setDomain('');
    setReason('');
    setDescription('');
    onClose?.();
  };

  const handleSubmit = () => {
    if (!domain || !reason.trim()) return;

    onSubmit?.({
      domain,
      reason,
      description,
    });

    setDomain('');
    setReason('');
    setDescription('');
  };

  return (
    <BaseModal open={open} onClose={handleClose}>
      <div className="flex flex-col gap-4 px-6 py-6">
        <h3 className="text-lg font-semibold leading-7 text-neutral-950">제재 적용</h3>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium leading-5 text-neutral-950">제재 도메인</label>

          <DropdownSelect
            value={domain}
            placeholder="선택하기"
            options={domainOptions}
            onChange={setDomain}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium leading-5 text-neutral-950">제재 사유</label>

          <Input
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            className="h-10 rounded px-3 text-sm"
            placeholder=""
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium leading-5 text-neutral-950">상세 설명</label>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="min-h-24 w-full rounded border border-neutral-300 px-3 py-2 text-sm text-neutral-950 outline-none focus:border-black"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!domain || !reason.trim()}
            className="flex-1 rounded bg-black px-4 py-2.5 text-base font-medium text-white disabled:cursor-not-allowed disabled:bg-neutral-300"
          >
            확인
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="flex-1 rounded border border-neutral-300 bg-white px-4 py-2.5 text-base font-medium text-neutral-950"
          >
            취소
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
