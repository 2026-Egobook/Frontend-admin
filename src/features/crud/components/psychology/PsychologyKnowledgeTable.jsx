export default function PsychologyKnowledgeTable({ rows = [], onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-neutral-200 bg-white">
      <table className="w-full border-collapse">
        <thead>
          <tr className="h-11 border-b border-neutral-200">
            <th className="w-16 px-6 text-left text-sm font-medium text-neutral-600">ID</th>
            <th className="px-6 text-left text-sm font-medium text-neutral-600">내용</th>
            <th className="w-72 px-6 text-left text-sm font-medium text-neutral-600">출처</th>
            <th className="w-48 px-6 text-left text-sm font-medium text-neutral-600">생성일</th>
            <th className="w-32 px-6 text-left text-sm font-medium text-neutral-600" />
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="h-14 border-b border-neutral-200">
              <td className="px-6 text-sm text-neutral-950">{row.id}</td>
              <td className="px-6 text-sm text-neutral-950">{row.content}</td>
              <td className="px-6 text-sm text-neutral-600">{row.source}</td>
              <td className="px-6 text-sm text-neutral-600">{row.createdAt}</td>
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
