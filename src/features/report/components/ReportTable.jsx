import { useNavigate } from 'react-router-dom';
import { PATH } from '@/app/routes/path';
import ReportStatusBadge from './ReportStatusBadge';

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
            <th className="px-6 text-sm font-medium leading-5 text-neutral-600">신고자 ID</th>
            <th className="px-6 text-sm font-medium leading-5 text-neutral-600">사유</th>
            <th className="px-6 text-sm font-medium leading-5 text-neutral-600">누적 신고</th>
            <th className="px-6 text-sm font-medium leading-5 text-neutral-600">상태</th>
            <th className="px-6 text-sm font-medium leading-5 text-neutral-600">일시</th>
            <th className="px-6 text-sm font-medium leading-5 text-neutral-600"></th>
          </tr>
        </thead>

        <tbody>
          {reports.length === 0 ? (
            <tr>
              <td colSpan={9} className="px-6 py-10 text-center text-sm text-neutral-500">
                조회된 신고가 없습니다.
              </td>
            </tr>
          ) : (
            reports.map((report) => (
              <tr key={`${report.contentType}-${report.reportId}`} className="border-b border-neutral-200">
                <td className="px-6 py-6 text-sm text-neutral-950">{report.reportId}</td>
                <td className="px-6 py-6 text-sm text-neutral-950">{report.contentTypeLabel}</td>
                <td className="px-6 py-6 text-sm text-neutral-950">{report.content}</td>
                <td className="px-6 py-6 text-sm text-neutral-950">{report.authorId}</td>
                <td className="px-6 py-6 text-sm text-neutral-950">{report.reason}</td>
                <td className="px-6 py-6 text-sm text-neutral-950">{report.totalReportCount}회</td>
                <td className="px-6 py-6 align-middle">
                  <ReportStatusBadge status={report.status} label={report.statusLabel} />
                </td>
                <td className="px-6 py-6 text-sm text-neutral-600">{report.createdAt}</td>
                <td className="px-6 py-6 align-middle">
                  <button
                    type="button"
                    onClick={() => navigate(PATH.REPORT_DETAIL.replace(':contentType', report.contentType).replace(':reportId', report.reportId))}
                    className="w-8 text-center text-sm leading-5 text-black hover:underline"
                  >
                    <span className="block">상세</span>
                    <span className="block">보기</span>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
