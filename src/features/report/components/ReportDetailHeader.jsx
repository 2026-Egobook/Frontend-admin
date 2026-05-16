export default function ReportDetailHeader({ detail }) {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold leading-7 text-neutral-950">신고 정보</h3>

      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        <div>
          <div className="text-sm font-normal leading-5 text-neutral-600">콘텐츠 유형</div>
          <div className="text-base font-medium leading-6 text-neutral-950">
            {detail.contentTypeLabel}
          </div>
        </div>

        <div>
          <div className="text-sm font-normal leading-5 text-neutral-600">
            {detail.targetContentIdLabel}
          </div>
          <div className="text-base font-medium leading-6 text-neutral-950">
            {detail.targetContentId}
          </div>
        </div>

        <div>
          <div className="text-sm font-normal leading-5 text-neutral-600">누적 신고 횟수</div>
          <div className="text-base font-medium leading-6 text-red-600">
            {detail.totalReportCount}회
          </div>
        </div>
      </div>
    </section>
  );
}
