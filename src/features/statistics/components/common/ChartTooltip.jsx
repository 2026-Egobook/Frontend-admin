export default function ChartTooltip({ active, payload, label, labelMap = {} }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="border border-neutral-300 bg-white px-6 py-3">
      <p className="mb-3 text-sm font-medium text-black">{label}</p>

      <div className="flex flex-col gap-2">
        {payload.map((item) => (
          <p
            key={item.dataKey}
            className={`text-sm font-medium ${
              item.color === '#808080' ? 'text-neutral-500' : 'text-black'
            }`}
          >
            {labelMap[item.dataKey] || item.name} : {item.value}
          </p>
        ))}
      </div>
    </div>
  );
}