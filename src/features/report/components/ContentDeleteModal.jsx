import BaseModal from '@/shared/components/ui/BaseModal';

export default function ContentDeleteModal({ open, onClose, onConfirm }) {
  return (
    <BaseModal open={open} onClose={onClose} className="max-w-[480px]">
      <div className="flex flex-col gap-6 rounded-[10px] bg-white px-6 py-6">
        <h3 className="text-lg font-semibold leading-7 text-neutral-950">콘텐츠 삭제 확인</h3>

        <p className="break-keep text-sm font-normal leading-5 text-neutral-600">
          해당 콘텐츠를 삭제하시겠습니까? 삭제 후 복구할 수 없습니다.
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onConfirm}
            className="h-10 flex-1 rounded bg-red-600 text-base font-medium leading-6 text-white"
          >
            삭제
          </button>

          <button
            type="button"
            onClick={onClose}
            className="h-10 flex-1 rounded border border-neutral-300 bg-white text-base font-medium leading-6 text-neutral-950"
          >
            취소
          </button>
        </div>
      </div>
    </BaseModal>
  );
}