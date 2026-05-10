import SendStatusCard from '@/features/content/components/common/SendStatusCard';

export default function LetterGiveUpStatus({ data }) {
  return (
    <section className="rounded-[10px] border border-neutral-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-neutral-950">편지 답장 포기 현황</h2>

      <div className="mb-5 flex gap-5">
        <SendStatusCard label="전체 편지 수" value={data.totalLetterCount.toLocaleString()} />
        <SendStatusCard label="포기 처리 수" value={data.giveUpCount.toLocaleString()} danger />
        <SendStatusCard label="포기율" value={`${data.giveUpRate}%`} />
      </div>

      <p className="text-xs text-neutral-600">24시간 내 미답장으로 포기 처리된 비율</p>
    </section>
  );
}