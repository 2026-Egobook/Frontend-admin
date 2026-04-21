import BaseModal from '@/shared/components/ui/BaseModal';

export default function ReportStatusModal({ open, report, onClose, onResolve, onRefuse }) {
  return (
    <BaseModal open={open} onClose={onClose}>
      <div className="flex flex-col gap-4 px-6 py-6">
        <h3 className="text-lg font-semibold leading-7 text-neutral-950">신고 상태 변경</h3>

        <div className="text-sm font-normal leading-5 text-neutral-600">
          신고 ID: {report?.reportId}
        </div>

        <div className="text-sm font-normal leading-5 text-neutral-600">
          처리 방법을 선택하세요:
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={onResolve}
            className="h-10 rounded bg-green-600 text-base font-medium text-white"
          >
            승인 (RESOLVED)
          </button>

          <button
            type="button"
            onClick={onRefuse}
            className="h-10 rounded bg-red-600 text-base font-medium text-white"
          >
            거부 (REFUSED)
          </button>

          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded border border-neutral-300 bg-white text-base font-medium text-neutral-950"
          >
            취소
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
