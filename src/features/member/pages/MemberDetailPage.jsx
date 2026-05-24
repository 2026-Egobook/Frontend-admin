import { useMemo, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import MemberSummaryCard from '../components/MemberSummaryCard';
import ReportHistorySection from '../components/ReportHistorySection';
import SanctionHistorySection from '../components/SanctionHistorySection';
import SanctionActionButtons from '../components/SanctionActionButtons';
import ApplySanctionModal from '../components/ApplySanctionModal';
import CancelSanctionModal from '../components/CancelSanctionModal';
import ReportStatusModal from '../components/ReportStatusModal';
import { useMemberDetail } from '../hooks/useMemberDetail';
import { useMemberStats } from '../hooks/useMemberStats';
import { useMemberReportHistory } from '../hooks/useMemberReportHistory';
import { useMemberRestrictions } from '../hooks/useMemberRestrictions';
import { useApplyMemberSanction } from '../hooks/useApplyMemberSanction';
import { useCancelMemberSanction } from '../hooks/useCancelMemberSanction';
import { deleteReportedContent } from '@/features/report/api/reportApi';
import Spinner from '@/shared/components/ui/Spinner';

const DOMAIN_TYPE_LABEL = {
  LETTER: '편지',
  QUESTION_ANSWER: '질문 답변',
};

const REASON_LABEL = {
  ABUSE: '비속어 및 모욕',
  SPAM: '광고 및 스팸',
  INAPPROPRIATE: '부적절한 콘텐츠',
  OTHER: '기타',
};

const CONTENT_TYPE_MAP = {
  LETTER: 'LETTER',
  LETTER_REPLY: 'REPLY',
  QUESTION_ANSWER: 'ANSWER',
};

function groupReports(reports) {
  const map = new Map();
  reports.forEach((report) => {
    const key = `${report.reportDomainType}__${report.targetId}`;
    if (!map.has(key)) {
      map.set(key, {
        key,
        domainType: report.reportDomainType,
        targetId: report.targetId,
        content: report.content,
        reports: [],
      });
    }
    map.get(key).reports.push(report);
  });
  return Array.from(map.values());
}

export default function MemberDetailPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { memberId } = useParams();

  const { data: member, isLoading: memberLoading } = useMemberDetail(memberId);
  const { data: stats, isLoading: statsLoading } = useMemberStats(memberId);

  const [reportType, setReportType] = useState('REPORTED');
  const [processModal, setProcessModal] = useState({ open: false, report: null });
  const [processing, setProcessing] = useState(false);

  const { data: letterData, isLoading: letterLoading } = useMemberReportHistory({
    userId: memberId, reportDomainType: 'LETTER', reportType, size: 100,
  });
  const { data: replyData, isLoading: replyLoading } = useMemberReportHistory({
    userId: memberId, reportDomainType: 'LETTER_REPLY', reportType, size: 100,
  });
  const { data: answerData, isLoading: answerLoading } = useMemberReportHistory({
    userId: memberId, reportDomainType: 'QUESTION_ANSWER', reportType, size: 100,
  });

  const reportLoading = letterLoading || replyLoading || answerLoading;

  // 3개 도메인 쿼리의 summary를 합산해 사용자 전체 집계값 산출
  const summary = (letterData?.summary || replyData?.summary || answerData?.summary)
    ? {
        totalReportCount:
          (letterData?.summary?.totalReportCount ?? 0) +
          (replyData?.summary?.totalReportCount ?? 0) +
          (answerData?.summary?.totalReportCount ?? 0),
        totalReportedCount:
          (letterData?.summary?.totalReportedCount ?? 0) +
          (replyData?.summary?.totalReportedCount ?? 0) +
          (answerData?.summary?.totalReportedCount ?? 0),
        pastSuspendedCount:
          letterData?.summary?.pastSuspendedCount ??
          replyData?.summary?.pastSuspendedCount ??
          answerData?.summary?.pastSuspendedCount ??
          0,
      }
    : undefined;

  const groupedReports = useMemo(() => {
    const allReports = [
      ...(letterData?.reportList?.content ?? []),
      ...(replyData?.reportList?.content ?? []),
      ...(answerData?.reportList?.content ?? []),
    ];
    return groupReports(allReports);
  }, [letterData, replyData, answerData]);

  const { data: restrictionData, isLoading: restrictionLoading } = useMemberRestrictions({
    userId: memberId,
    page: 1,
    size: 50,
  });

  const applySanctionMutation = useApplyMemberSanction(memberId);
  const cancelSanctionMutation = useCancelMemberSanction(memberId);

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const handleApplySanction = async ({ domainType, reason, description }) => {
    await applySanctionMutation.mutateAsync({ userId: memberId, domainType, reason, description });
    setApplyModalOpen(false);
  };

  const handleCancelSanction = async (restrictionId) => {
    await cancelSanctionMutation.mutateAsync(restrictionId);
    setCancelModalOpen(false);
  };

  const handleProcess = (report) => {
    setProcessModal({ open: true, report });
  };

  const handleResolve = async () => {
    const { report } = processModal;
    if (!report) return;
    try {
      setProcessing(true);
      await deleteReportedContent({
        contentType: CONTENT_TYPE_MAP[report.reportDomainType],
        contentId: report.targetId,
      });
      queryClient.invalidateQueries({ queryKey: ['memberReportHistory'] });
      setProcessModal({ open: false, report: null });
    } finally {
      setProcessing(false);
    }
  };

  const handleRefuse = async () => {
    // 백엔드 API 미제공 — 추후 연동
    setProcessModal({ open: false, report: null });
  };

  const restrictions = restrictionData?.content ?? [];
  const activeRestrictions = restrictions
    .filter((r) => r.restrictionStatus === 'ACTIVE')
    .map((r) => ({
      label: `${DOMAIN_TYPE_LABEL[r.domainType] ?? r.domainType} - ${REASON_LABEL[r.reason] ?? r.reason}`,
      value: r.restrictionId,
    }));

  const isLoading = memberLoading || statsLoading;

  if (isLoading) {
    return <Spinner />;
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
          <MemberSummaryCard member={member} stats={stats} />

          <ReportHistorySection
            summary={summary}
            groupedReports={groupedReports}
            reportType={reportType}
            onReportTypeChange={setReportType}
            isLoading={reportLoading}
            onProcess={handleProcess}
          />

          <SanctionHistorySection
            restrictions={restrictions}
            isLoading={restrictionLoading}
          />

          <SanctionActionButtons
            onOpenApply={() => setApplyModalOpen(true)}
            onOpenCancel={() => setCancelModalOpen(true)}
          />
        </div>
      </div>

      <ApplySanctionModal
        open={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        onSubmit={handleApplySanction}
      />

      <CancelSanctionModal
        open={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        activeRestrictions={activeRestrictions}
        onSubmit={handleCancelSanction}
      />

      <ReportStatusModal
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
