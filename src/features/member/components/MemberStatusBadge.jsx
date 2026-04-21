const STATUS_STYLE = {
  ACTIVE: 'bg-green-100 text-green-800',
  SUSPENDED: 'bg-red-100 text-red-800',
  WITHDRAW_PENDING: 'bg-yellow-100 text-yellow-800',
};

function MemberStatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-1 text-xs font-normal leading-4 ${
        STATUS_STYLE[status] || 'bg-gray-100 text-gray-700'
      }`}
    >
      {status}
    </span>
  );
}

export default MemberStatusBadge;
