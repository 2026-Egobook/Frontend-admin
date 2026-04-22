export default function SendStatusCard({ label, value, danger = false }) {
  return (
    <div className="flex h-20 flex-1 flex-col rounded border border-neutral-200 bg-neutral-50 px-4 pt-4 pb-1">
      <div className="text-sm font-normal leading-5 text-neutral-600">{label}</div>
      <div
        className={`text-2xl font-semibold leading-8 ${
          danger ? 'text-red-600' : 'text-neutral-950'
        }`}
      >
        {value}
      </div>
    </div>
  );
}
