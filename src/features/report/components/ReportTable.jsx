import { useNavigate } from 'react-router-dom';
import ReportStatusBadge from './ReportStatusBadge';

function formatDateTime(dateTime) {
  return dateTime;
}

export default function ReportTable({ reports = [] }) {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-[10px] border border-neutral-200 bg-white">
      <table className="w-full border-collapse">
        <thead>
          <tr className="h-20 border-b border-neutral-200 bg-white text-left">
            <th className="px-6 text-sm font-medium leading-5 text-neutral-600">신고 ID</th>
            <th className="px-6 text-sm font-medium leading-5 text-neutral-600">콘텐츠 유형</th>
            <th className="px-6 text-sm font-medium leading-5 text-neutral-600">내용</th>
            <th className="px-6 text-sm font-medium leading-5 text-neutral-600">작성자 ID</th>
            <th className="px-6 text-sm font-medium leading-5 text-neutral-600">사유</th>
            <th className="px-6 text-sm font-medium leading-5 text-neutral-600">누적 신고</th>
            <th className="px-6 text-sm font-medium leading-5 text-neutral-600">상태</th>
            <th className="px-6 text-sm font-medium leading-5 text-neutral-600">일시</th>
            <th className="px-6 text-sm font-medium leading-5 text-neutral-600"></th>
          </tr>
        </thead>

        <tbody>
          {reports.map((report) => (
            <tr
              key={report.reportId}
              className={`border-b border-neutral-200 ${
                report.isNew && report.status === 'PENDING' ? 'bg-[#F3D6D6]' : 'bg-white'
              }`}
            >
              <td className="px-6 py-6 text-sm font-normal leading-5 text-neutral-950">
                {report.reportId}
              </td>
              <td className="px-6 py-6 text-sm font-normal leading-5 text-neutral-950">
                {report.contentTypeLabel}
              </td>
              <td className="px-6 py-6 text-sm font-normal leading-5 text-neutral-950">
                {report.content}
              </td>
              <td className="px-6 py-6 text-sm font-normal leading-5 text-neutral-950">
                {report.authorId}
              </td>
              <td className="px-6 py-6 text-sm font-normal leading-5 text-neutral-950">
                {report.reason}
              </td>
              <td className="px-6 py-6 text-sm font-normal leading-5 text-neutral-950">
                {report.totalReportCount}회
              </td>
              <td className="px-6 py-6">
                <ReportStatusBadge status={report.status} label={report.statusLabel} />
              </td>
              <td className="px-6 py-6 text-sm font-normal leading-5 text-neutral-600">
                {formatDateTime(report.createdAt)}
              </td>
              <td className="px-6 py-6">
                <button
                  type="button"
                  onClick={() => navigate(`/reports/${report.reportId}`)}
                  className="text-sm font-normal leading-5 text-black"
                >
                  상세보기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
