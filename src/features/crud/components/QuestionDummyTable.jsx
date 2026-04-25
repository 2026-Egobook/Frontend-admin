// src/features/crud/components/QuestionDummyTable.jsx
export default function QuestionDummyTable({ rows = [], onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-neutral-200 bg-white">
      <table className="w-full border-collapse">
        <thead>
          <tr className="h-11 border-b border-neutral-200">
            <th className="w-20 px-6 text-left text-sm font-medium text-neutral-600">ID</th>
            <th className="px-6 text-left text-sm font-medium text-neutral-600">질문 내용</th>
            <th className="w-36 px-6 text-left text-sm font-medium text-neutral-600">발송 날짜</th>
            <th className="w-52 px-6 text-left text-sm font-medium text-neutral-600">생성일</th>
            <th className="w-36 px-6 text-left text-sm font-medium text-neutral-600" />
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="h-14 border-b border-neutral-200">
              <td className="px-6 text-sm text-neutral-950">{row.id}</td>
              <td className="px-6 text-sm text-neutral-950">{row.question}</td>
              <td className="px-6 text-sm text-neutral-600">{row.sendDate}</td>
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
