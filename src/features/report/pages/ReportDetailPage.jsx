import { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import useReportDetail from '../hooks/useReportDetail';
import {
  useApplyReportSanction,
  useDeleteReportedContent,
  useRejectReportGroup,
  useSaveReportMemo,
  useUpdateReportStatus,
} from '../hooks/useReportActions';
import ReportDetailHeader from '../components/ReportDetailHeader';
import ReportHistoryList from '../components/ReportHistoryList';
import ReportMemoForm from '../components/ReportMemoForm';
import ContentDeleteModal from '../components/ContentDeleteModal';
import RejectReportModal from '../components/RejectReportModal';
import SanctionProcessModal from '../components/SanctionProcessModal';
import ReportStatusChangeModal from '../components/ReportStatusChangeModal';

export default function ReportDetailPage() {
  const navigate = useNavigate();
  const { reportId } = useParams();

  const { data: detail, isLoading } = useReportDetail(reportId);

  const updateReportStatusMutation = useUpdateReportStatus(reportId);
  const rejectReportMutation = useRejectReportGroup(reportId);
  const applySanctionMutation = useApplyReportSanction(reportId);
  const deleteContentMutation = useDeleteReportedContent(reportId);
  const saveMemoMutation = useSaveReportMemo(reportId);

  const [selectedReport, setSelectedReport] = useState(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [sanctionModalOpen, setSanctionModalOpen] = useState(false);

  const handleOpenStatusModal = (report) => {
    setSelectedReport(report);
    setStatusModalOpen(true);
  };

  const handleResolve = async () => {
    await updateReportStatusMutation.mutateAsync({
      reportId: selectedReport.reportId,
      status: 'RESOLVED',
    });

    setStatusModalOpen(false);
    setSelectedReport(null);
  };

  const handleRefuse = async () => {
    await updateReportStatusMutation.mutateAsync({
      reportId: selectedReport.reportId,
      status: 'REFUSED',
    });

    setStatusModalOpen(false);
    setSelectedReport(null);
  };

  if (isLoading) {
    return (
      <div className="rounded-[10px] border border-neutral-200 bg-white px-6 py-10 text-sm text-neutral-500">
        신고 상세 정보를 불러오는 중입니다.
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="rounded-[10px] border border-neutral-200 bg-white px-6 py-10 text-sm text-neutral-500">
        신고 상세 정보를 찾을 수 없습니다.
      </div>
    );
  }

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
              <button
                type="button"
                onClick={() => setRejectModalOpen(true)}
                className="h-10 rounded border border-neutral-300 bg-white px-4 text-base font-medium text-neutral-950"
              >
                신고 반려
              </button>
              <button
                type="button"
                onClick={() => setSanctionModalOpen(true)}
                className="h-10 rounded bg-black px-4 text-base font-medium text-white"
              >
                제재 처리
              </button>
            </div>
          </section>

          <ReportHistoryList reports={detail.reports} onProcess={handleOpenStatusModal} />

          <ReportMemoForm
            initialMemo={detail.memo}
            onSave={(memo) =>
              saveMemoMutation.mutate({
                reportGroupId: detail.reportGroupId,
                memo,
              })
            }
          />
        </div>
      </div>

      <ContentDeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={async () => {
          await deleteContentMutation.mutateAsync({
            reportGroupId: detail.reportGroupId,
          });
          setDeleteModalOpen(false);
        }}
      />

      <RejectReportModal
        open={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        onSubmit={async ({ reason }) => {
          await rejectReportMutation.mutateAsync({
            reportGroupId: detail.reportGroupId,
            reason,
          });
          setRejectModalOpen(false);
        }}
      />

      <SanctionProcessModal
        open={sanctionModalOpen}
        onClose={() => setSanctionModalOpen(false)}
        onSubmit={async ({ days, reason }) => {
          await applySanctionMutation.mutateAsync({
            reportGroupId: detail.reportGroupId,
            days,
            reason,
          });
          setSanctionModalOpen(false);
        }}
      />

      <ReportStatusChangeModal
        open={statusModalOpen}
        report={selectedReport}
        onClose={() => {
          setStatusModalOpen(false);
          setSelectedReport(null);
        }}
        onResolve={handleResolve}
        onRefuse={handleRefuse}
      />
    </>
  );
}
