import { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import MemberSummaryCard from '../components/MemberSummaryCard';
import ReportHistorySection from '../components/ReportHistorySection';
import SanctionHistorySection from '../components/SanctionHistorySection';
import SanctionActionButtons from '../components/SanctionActionButtons';
import ReportStatusModal from '../components/ReportStatusModal';
import ApplySanctionModal from '../components/ApplySanctionModal';
import CancelSanctionModal from '../components/CancelSanctionModal';
import { useMemberDetail } from '../hooks/useMemberDetail';
import { useUpdateReportStatus } from '../hooks/useUpdateReportStatus';
import { useApplyMemberSanction } from '../hooks/useApplyMemberSanction';
import { useCancelMemberSanction } from '../hooks/useCancelMemberSanction';

export default function MemberDetailPage() {
  const navigate = useNavigate();
  const { memberId } = useParams();

  const { data: member, isLoading } = useMemberDetail(memberId);
  const updateReportStatusMutation = useUpdateReportStatus(memberId);
  const applySanctionMutation = useApplyMemberSanction(memberId);
  const cancelSanctionMutation = useCancelMemberSanction(memberId);

  const [selectedReport, setSelectedReport] = useState(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const handleOpenReportModal = (report) => {
    setSelectedReport(report);
    setReportModalOpen(true);
  };

  const handleResolveReport = async () => {
    if (!selectedReport) return;

    await updateReportStatusMutation.mutateAsync({
      memberId,
      reportId: selectedReport.reportId,
      status: 'RESOLVED',
    });

    setReportModalOpen(false);
    setSelectedReport(null);
  };

  const handleRefuseReport = async () => {
    if (!selectedReport) return;

    await updateReportStatusMutation.mutateAsync({
      memberId,
      reportId: selectedReport.reportId,
      status: 'REFUSED',
    });

    setReportModalOpen(false);
    setSelectedReport(null);
  };

  const handleApplySanction = async ({ domain, reason, description }) => {
    await applySanctionMutation.mutateAsync({
      memberId,
      domain,
      reason,
      description,
    });

    setApplyModalOpen(false);
  };

  const handleCancelSanction = async ({ domain }) => {
    await cancelSanctionMutation.mutateAsync({
      memberId,
      domain,
    });

    setCancelModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="rounded-[10px] border border-neutral-200 bg-white px-6 py-10 text-sm text-neutral-500">
        회원 상세 정보를 불러오는 중입니다.
      </div>
    );
  }

  if (!member) {
    return (
      <div className="rounded-[10px] border border-neutral-200 bg-white px-6 py-10 text-sm text-neutral-500">
        회원 정보를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6 bg-white">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-9 w-9 items-center justify-center rounded text-neutral-950"
          >
            <FiArrowLeft className="h-5 w-5" />
          </button>

          <h1 className="text-2xl font-semibold leading-8 text-neutral-950">회원 상세</h1>
        </div>

        <div className="flex flex-col gap-6 rounded-[10px] border border-neutral-200 bg-white p-6">
          <MemberSummaryCard member={member} />

          <ReportHistorySection
            reportSummary={member.reportSummary}
            reportsReceived={member.reportsReceived}
            reportsSent={member.reportsSent}
            onProcessReport={handleOpenReportModal}
          />

          <SanctionHistorySection sanctions={member.sanctions} />

          <SanctionActionButtons
            onOpenApply={() => setApplyModalOpen(true)}
            onOpenCancel={() => setCancelModalOpen(true)}
          />
        </div>
      </div>

      <ReportStatusModal
        open={reportModalOpen}
        report={selectedReport}
        onClose={() => {
          setReportModalOpen(false);
          setSelectedReport(null);
        }}
        onResolve={handleResolveReport}
        onRefuse={handleRefuseReport}
      />

      <ApplySanctionModal
        open={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        onSubmit={handleApplySanction}
      />

      <CancelSanctionModal
        open={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        domains={member.activeSanctionDomains ?? []}
        onSubmit={handleCancelSanction}
      />
    </>
  );
}
