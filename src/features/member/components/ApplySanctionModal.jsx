import { useState } from 'react';
import BaseModal from '@/shared/components/ui/BaseModal';
import DropdownSelect from '@/shared/components/ui/DropdownSelect';

const DOMAIN_OPTIONS = [
  { label: '편지', value: 'LETTER' },
  { label: '질문 답변', value: 'QUESTION_ANSWER' },
];

const REASON_OPTIONS = [
  { label: '비속어 및 모욕', value: 'ABUSE' },
  { label: '광고 및 스팸', value: 'SPAM' },
  { label: '부적절한 콘텐츠', value: 'INAPPROPRIATE' },
  { label: '기타', value: 'OTHER' },
];

export default function ApplySanctionModal({ open, onClose, onSubmit }) {
  const [domainType, setDomainType] = useState('');
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');

  const handleClose = () => {
    setDomainType('');
    setReason('');
    setDescription('');
    onClose?.();
  };

  const handleSubmit = () => {
    if (!domainType || !reason) return;

    onSubmit?.({ domainType, reason, description });

    setDomainType('');
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
            value={domainType}
            placeholder="선택하기"
            options={DOMAIN_OPTIONS}
            onChange={setDomainType}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium leading-5 text-neutral-950">제재 사유</label>

          <DropdownSelect
            value={reason}
            placeholder="선택하기"
            options={REASON_OPTIONS}
            onChange={setReason}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium leading-5 text-neutral-950">
            상세 설명 <span className="text-xs font-normal text-neutral-500">(최대 500자)</span>
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            className="min-h-24 w-full rounded border border-neutral-300 px-3 py-2 text-sm text-neutral-950 outline-none focus:border-black"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!domainType || !reason}
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
