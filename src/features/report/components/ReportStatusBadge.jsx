export default function ReportStatusBadge({ status, label }) {
  const statusStyleMap = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    SANCTION_COMPLETED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
    RESOLVED: 'bg-green-100 text-green-800',
    REFUSED: 'bg-red-100 text-red-800',
  };

  return (
    <span
      className={`inline-flex w-fit whitespace-nowrap rounded px-2 py-1 text-xs font-normal leading-4 ${
        statusStyleMap[status] || 'bg-neutral-100 text-neutral-700'
      }`}
    >
      {label}
    </span>
  );
}
