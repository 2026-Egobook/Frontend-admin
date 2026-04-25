export default function ItemTable({ rows = [], onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-neutral-200 bg-white">
      <table className="w-full border-collapse">
        <thead>
          <tr className="h-11 border-b border-neutral-200">
            <th className="w-24 px-6 text-left text-sm font-medium text-neutral-600">ID</th>
            <th className="w-40 px-6 text-left text-sm font-medium text-neutral-600">이름</th>
            <th className="w-52 px-6 text-left text-sm font-medium text-neutral-600">카테고리</th>
            <th className="w-36 px-6 text-left text-sm font-medium text-neutral-600">가격</th>
            <th className="w-44 px-6 text-left text-sm font-medium text-neutral-600">이미지</th>
            <th className="w-40 px-6 text-left text-sm font-medium text-neutral-600">활성 상태</th>
            <th className="w-44 px-6 text-left text-sm font-medium text-neutral-600" />
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="h-16 border-b border-neutral-200">
              <td className="px-6 text-sm text-neutral-950">{row.id}</td>
              <td className="px-6 text-sm font-medium text-neutral-950">{row.name}</td>
              <td className="px-6">
                <span className="rounded bg-neutral-100 px-2 py-1 text-xs text-neutral-950">
                  {row.category}
                </span>
              </td>
              <td className="px-6 text-sm text-neutral-950">{row.price} 잉크</td>
              <td className="px-6">
                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded border border-neutral-200 bg-neutral-300" />
                  <div className="h-8 w-8 rounded border border-neutral-200 bg-neutral-300" />
                </div>
              </td>
              <td className="px-6 text-xs font-medium text-neutral-950">
                {row.active ? '활성' : '비활성'}
              </td>
              <td className="px-6">
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => onEdit(row)}
                    className="text-base font-medium text-black"
                  >
                    수정
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(row)}
                    className="text-base font-medium text-red-600"
                  >
                    삭제
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
