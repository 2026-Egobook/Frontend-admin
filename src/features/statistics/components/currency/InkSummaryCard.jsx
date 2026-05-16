export default function InkSummaryCard({ item }) {
  const amount = item.issued - item.consumed;
  const positive = amount >= 0;

  return (
    <div className="rounded border border-neutral-200 bg-neutral-50 p-4">
      <p className="mb-4 text-sm text-neutral-600">{item.date}</p>

      <div className="flex items-center justify-between">
        <p className="text-xs text-neutral-600">순 증감</p>
        <p className={`text-lg font-semibold ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {positive ? '+' : ''}
          {amount.toLocaleString()}
        </p>
      </div>
    </div>
  );
}