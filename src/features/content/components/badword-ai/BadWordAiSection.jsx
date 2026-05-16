import DateRangeFilter from '@/shared/components/ui/date-picker/DateRangeFilter';

function SummaryCard({ label, value }) {
  return (
    <div className="flex h-20 flex-1 flex-col rounded border border-neutral-200 bg-neutral-50 px-4 pt-4 pb-1">
      <div className="text-sm font-normal leading-5 text-neutral-600">{label}</div>
      <div className="text-2xl font-semibold leading-8 text-neutral-950">{value}</div>
    </div>
  );
}

function ContentTypeBadge({ type }) {
  return (
    <div className="rounded bg-blue-100 px-2 py-1 text-xs font-medium leading-4 text-blue-800">
      {type}
    </div>
  );
}

function KeywordChip({ keyword }) {
  return (
    <div className="rounded bg-red-100 px-2 py-1 text-xs font-normal leading-4 text-red-800">
      {keyword}
    </div>
  );
}

function BlockedTextCard({ item }) {
  return (
    <div className="flex flex-col gap-2 rounded border border-neutral-200 bg-neutral-50 px-4 pt-4 pb-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ContentTypeBadge type={item.contentType} />
          <div className="text-sm font-medium leading-5 text-neutral-950">
            차단 ID: {item.blockId} | 유저 ID: {item.userId}
          </div>
        </div>

        <div className="text-xs font-normal leading-4 text-neutral-600">{item.createdAt}</div>
      </div>

      <div className="text-sm font-normal leading-5 text-neutral-700">
        원문: {item.originalText}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {item.keywords.map((keyword) => (
            <KeywordChip key={keyword} keyword={keyword} />
          ))}
        </div>

        <div className="text-xs font-normal leading-4 text-neutral-600">점수: {item.score}</div>
      </div>
    </div>
  );
}

export default function BadWordAiSection({
  data,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) {
  return (
    <div className="flex flex-col gap-6 rounded-[10px] border border-neutral-200 bg-white p-6">
      <h3 className="text-lg font-semibold leading-7 text-neutral-950">차단 현황</h3>

      <DateRangeFilter
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
      />

      <div className="grid grid-cols-2 gap-4">
        <SummaryCard label="전체 차단 건수" value={data.summary.blockedCount} />
        <SummaryCard label="차단율" value={data.summary.blockedRate} />
      </div>

      <div className="text-base font-medium leading-6 text-neutral-950">차단된 텍스트 리스트</div>

      <div className="flex flex-col gap-2">
        {data.blockedTexts.map((item) => (
          <BlockedTextCard key={item.blockId} item={item} />
        ))}
      </div>
    </div>
  );
}
