import { formatDateTime } from '@/shared/utils/dateUtils';

const DOMAIN_TYPE_LABEL = {
  LETTER: '편지',
  QUESTION_ANSWER: '질문 답변',
};

const REASON_LABEL = {
  ABUSE: '비속어 및 모욕',
  SPAM: '광고 및 스팸',
  INAPPROPRIATE: '부적절한 콘텐츠',
  OTHER: '기타',
};

const STATUS_LABEL = {
  ACTIVE: '제재중',
  CANCELED: '취소됨',
  EXPIRED: '만료됨',
};

export default function SanctionHistorySection({ restrictions = [], isLoading }) {
  return (
    <section className="flex flex-col gap-4 border-t border-neutral-200 pt-6">
      <h2 className="text-lg font-semibold leading-7 text-neutral-950">제재 이력</h2>

      {isLoading ? (
        <div className="py-6 text-center text-sm text-neutral-500">제재 이력을 불러오는 중입니다.</div>
      ) : restrictions.length === 0 ? (
        <div className="py-6 text-center text-sm text-neutral-500">제재 이력이 없습니다.</div>
      ) : (
        <div className="flex flex-col gap-2">
          {restrictions.map((item) => {
            const isActive = item.restrictionStatus === 'ACTIVE';
            const domainLabel = DOMAIN_TYPE_LABEL[item.domainType] ?? item.domainType;
            const reasonLabel = REASON_LABEL[item.reason] ?? item.reason;
            const statusLabel = STATUS_LABEL[item.restrictionStatus] ?? item.restrictionStatus;

            return (
              <div
                key={item.restrictionId}
                className={`rounded border px-3 py-3 ${
                  isActive ? 'border-red-200 bg-red-50' : 'border-neutral-200 bg-neutral-50'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium leading-5 text-neutral-950">
                      {domainLabel} - {reasonLabel}
                    </div>
                    <div className="mt-1 text-xs font-normal leading-4 text-neutral-600">
                      {item.description}
                    </div>
                    <div className="mt-1 text-xs font-normal leading-4 text-neutral-600">
                      {formatDateTime(item.createdAt)}
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <div
                      className={`text-sm font-medium leading-5 ${
                        isActive ? 'text-red-600' : 'text-neutral-600'
                      }`}
                    >
                      {statusLabel}
                    </div>
                    <div className="text-xs font-normal leading-4 text-neutral-600">
                      ~{formatDateTime(item.restrictionUntil)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
