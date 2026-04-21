import { useState } from 'react';
import BaseModal from '@/shared/components/ui/BaseModal';
import DropdownSelect from '@/shared/components/ui/DropdownSelect';

export default function CancelSanctionModal({ open, onClose, domains = [], onSubmit }) {
  const [domain, setDomain] = useState('');

  const hasActiveSanction = domains.length > 0;

  const handleClose = () => {
    setDomain('');
    onClose?.();
  };

  const handleSubmit = () => {
    if (!domain) return;

    onSubmit?.({ domain });
    setDomain('');
  };

  return (
    <BaseModal open={open} onClose={handleClose}>
      <div className="flex flex-col gap-4 px-6 py-6">
        <h3 className="text-lg font-semibold leading-7 text-neutral-950">제재 취소 확인</h3>

        {!hasActiveSanction ? (
          <div className="text-sm font-normal leading-5 text-neutral-600">
            적용 중인 제재가 없습니다
          </div>
        ) : (
          <>
            <div className="text-sm font-normal leading-5 text-neutral-600">
              적용 중인 제재를 취소하시겠습니까?
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium leading-5 text-neutral-950">제재 도메인</label>

              <DropdownSelect
                value={domain}
                placeholder="선택하기"
                options={domains}
                onChange={setDomain}
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!domain}
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
          </>
        )}
      </div>
    </BaseModal>
  );
}
