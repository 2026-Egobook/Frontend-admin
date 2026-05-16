const colors = [
  'bg-neutral-900',
  'bg-neutral-700',
  'bg-neutral-500',
  'bg-neutral-400',
  'bg-neutral-300',
];

export default function WithdrawalReasonList({ reasons = [] }) {
  return (
    <div className="flex flex-col gap-3">
      {reasons.map((item, index) => (
        <div key={item.reason} className="rounded border border-neutral-200 bg-white">
          <div className="flex h-12 items-center justify-between px-3">
            <div className="flex items-center gap-3">
              <span className={`h-4 w-4 rounded ${colors[index]}`} />
              <span className="whitespace-nowrap text-sm text-neutral-950">{item.reason}</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-neutral-600">{item.percent}%</span>
              <span className="whitespace-nowrap text-base font-semibold text-neutral-950">
                {item.count}건
              </span>
            </div>
          </div>

          {item.examples && (
            <div className="border-t border-neutral-200 px-3 py-3">
              <p className="mb-2 text-xs text-neutral-600">기타 사유 예시:</p>
              {item.examples.map((example) => (
                <p key={example} className="pl-2 text-xs text-neutral-700">
                  • {example}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}