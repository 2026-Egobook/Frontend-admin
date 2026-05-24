import { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import useReportDetail from '../hooks/useReportDetail';
import {
  useDeleteReportedContent,
  useApproveReport,
  useRejectReport,
} from '../hooks/useReportActions';
import Spinner from '@/shared/components/ui/Spinner';
import ReportDetailHeader from '../components/ReportDetailHeader';
import ReportHistoryList from '../components/ReportHistoryList';
import ReportMemoForm from '../components/ReportMemoForm';
import ContentDeleteModal from '../components/ContentDeleteModal';
import ReportStatusChangeModal from '../components/ReportStatusChangeModal';

export default function ReportDetailPage() {
  const navigate = useNavigate();
  const { contentType, reportId } = useParams();

  const { data: detail, isLoading } = useReportDetail(contentType, reportId);
  const deleteContentMutation = useDeleteReportedContent(reportId);
  const approveMutation = useApproveReport(reportId);
  const rejectMutation = useRejectReport(reportId);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [processModal, setProcessModal] = useState({ open: false, report: null });
  const [processing, setProcessing] = useState(false);

  if (isLoading) {
    return <Spinner />;
  }

  if (!detail) {
    return (
      <div className="rounded-[10px] border border-neutral-200 bg-white px-6 py-10 text-sm text-neutral-500">
        신고 상세 정보를 찾을 수 없습니다.
      </div>
    );
  }

  const handleProcessReport = (report) => {
    setProcessModal({ open: true, report });
  };

  const handleResolve = async () => {
    try {
      setProcessing(true);
      await approveMutation.mutateAsync({
        contentType,
        reportId: processModal.report?.reportId,
      });
      setProcessModal({ open: false, report: null });
    } finally {
      setProcessing(false);
    }
  };

  const handleRefuse = async () => {
    try {
      setProcessing(true);
      await rejectMutation.mutateAsync({
        contentType,
        reportId: processModal.report?.reportId,
      });
      setProcessModal({ open: false, report: null });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-9 w-9 items-center justify-center rounded text-neutral-950"
          >
            <FiArrowLeft className="h-5 w-5" />
          </button>

          <h1 className="text-2xl font-semibold leading-8 text-neutral-950">신고 상세</h1>
        </div>

        <div className="flex flex-col gap-6 rounded-[10px] border border-neutral-200 bg-white px-6 pt-6 pb-8">
          <ReportDetailHeader detail={detail} />

          <section className="flex flex-col gap-4 border-t border-neutral-200 pt-6">
            <h3 className="text-lg font-semibold leading-7 text-neutral-950">신고된 콘텐츠 원문</h3>

            <div className="rounded border border-neutral-200 bg-neutral-50 px-4 py-4 text-base font-normal leading-6 text-neutral-950">
              {detail.originalContent}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(true)}
                className="h-10 rounded bg-red-600 px-4 text-base font-medium text-white"
              >
                콘텐츠 삭제
              </button>
            </div>
          </section>

          <ReportHistoryList reports={detail.reports} onProcess={handleProcessReport} />

          <ReportMemoForm initialMemo={detail.memo} onSave={() => {}} />
        </div>
      </div>

      <ContentDeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={async () => {
          await deleteContentMutation.mutateAsync({
            contentType: detail.contentType,
            contentId: detail.contentId,
          });
          setDeleteModalOpen(false);
          navigate(-1);
        }}
      />

      <ReportStatusChangeModal
        open={processModal.open}
        report={processModal.report}
        processing={processing}
        onClose={() => setProcessModal({ open: false, report: null })}
        onResolve={handleResolve}
        onRefuse={handleRefuse}
      />
    </>
  );
}
