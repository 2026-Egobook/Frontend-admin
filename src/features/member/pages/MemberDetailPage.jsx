import { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import MemberSummaryCard from '../components/MemberSummaryCard';
import ReportHistorySection from '../components/ReportHistorySection';
import SanctionHistorySection from '../components/SanctionHistorySection';
import SanctionActionButtons from '../components/SanctionActionButtons';
import ApplySanctionModal from '../components/ApplySanctionModal';
import CancelSanctionModal from '../components/CancelSanctionModal';
import { useMemberDetail } from '../hooks/useMemberDetail';
import { useMemberStats } from '../hooks/useMemberStats';
import { useMemberReportHistory } from '../hooks/useMemberReportHistory';
import { useMemberRestrictions } from '../hooks/useMemberRestrictions';
import { useApplyMemberSanction } from '../hooks/useApplyMemberSanction';
import { useCancelMemberSanction } from '../hooks/useCancelMemberSanction';

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

export default function MemberDetailPage() {
  const navigate = useNavigate();
  const { memberId } = useParams();

  const { data: member, isLoading: memberLoading } = useMemberDetail(memberId);
  const { data: stats, isLoading: statsLoading } = useMemberStats(memberId);

  const [reportPage, setReportPage] = useState(1);
  const [reportDomainType, setReportDomainType] = useState('LETTER');
  const [reportType, setReportType] = useState(null);
  const { data: reportData, isLoading: reportLoading } = useMemberReportHistory({
    userId: memberId,
    reportDomainType,
    reportType,
    page: reportPage,
    size: 10,
  });

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

  const restrictions = restrictionData?.content ?? [];
  const activeRestrictions = restrictions
    .filter((r) => r.restrictionStatus === 'ACTIVE')
    .map((r) => ({
      label: `${DOMAIN_TYPE_LABEL[r.domainType] ?? r.domainType} - ${REASON_LABEL[r.reason] ?? r.reason}`,
      value: r.restrictionId,
    }));

  const isLoading = memberLoading || statsLoading;

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
          <MemberSummaryCard member={member} stats={stats} />

          <ReportHistorySection
            summary={reportData?.summary}
            reports={reportData?.reportList?.content ?? []}
            hasNext={reportData?.reportList?.hasNext ?? false}
            page={reportPage}
            reportDomainType={reportDomainType}
            reportType={reportType}
            isLoading={reportLoading}
            onPageChange={setReportPage}
            onReportDomainTypeChange={(type) => {
              setReportDomainType(type);
              setReportPage(1);
            }}
            onReportTypeChange={(type) => {
              setReportType(type);
              setReportPage(1);
            }}
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
    </>
  );
}
