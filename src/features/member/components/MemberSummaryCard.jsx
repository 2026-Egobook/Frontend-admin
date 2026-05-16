import MemberStatusBadge from './MemberStatusBadge';
import { formatDateTime } from '@/shared/utils/dateUtils';

function InfoField({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-normal leading-5 text-neutral-600">{label}</span>
      <span className="text-base font-medium leading-6 text-neutral-950">{value ?? '-'}</span>
    </div>
  );
}

function StatField({ label, value, large = false }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-normal leading-5 text-neutral-600">{label}</span>
      <span
        className={
          large
            ? 'text-xl font-semibold leading-7 text-neutral-950'
            : 'text-base font-medium leading-6 text-neutral-950'
        }
      >
        {value ?? '-'}
      </span>
    </div>
  );
}

const ABILITY_LABELS = {
  empathy: '공감성',
  selfEsteem: '자존감',
  emotionRegulation: '감정조절',
  positiveThinking: '긍정사고',
  diligence: '성실함',
};

export default function MemberSummaryCard({ member, stats }) {
  const activityCount = stats?.activityCount ?? {};
  const abilityLevel = stats?.abilityLevel ?? {};

  const abilityItems = Object.entries(ABILITY_LABELS).map(([key, label]) => ({
    label,
    value: abilityLevel[key] != null ? `Lv. ${abilityLevel[key]}` : '-',
  }));

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold leading-7 text-neutral-950">기본 정보</h2>

        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          <InfoField label="사용자 ID" value={member.userId} />
          <InfoField label="계정 고유 코드" value={member.accountCode} />
          <InfoField label="이메일" value={member.email} />
          <InfoField label="생성 일시" value={formatDateTime(member.createdAt)} />
          <InfoField label="마지막 로그인" value={formatDateTime(member.lastLoginAt)} />

          <div className="flex flex-col gap-1">
            <span className="text-sm font-normal leading-5 text-neutral-600">계정 상태</span>
            <div>
              <MemberStatusBadge status={member.status} />
            </div>
          </div>

          <InfoField label="탈퇴 신청 일시" value={formatDateTime(member.deletedAt)} />
          <InfoField label="데이터 전부 삭제 예정 일시" value={formatDateTime(member.purgeAt)} />
        </div>
      </div>

      <div className="border-t border-neutral-200 pt-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold leading-7 text-neutral-950">활동 통계</h2>

          <div className="grid grid-cols-4 gap-x-6 gap-y-4">
            <StatField label="일기 작성 수" value={activityCount.diary} large />
            <StatField label="편지 작성 수" value={activityCount.letter} large />
            <StatField label="질문 답변 수" value={activityCount.questionAnswer} large />
            <StatField label="보유 잉크량" value={member.ink} large />

            <StatField
              label="고유 레벨"
              value={member.level != null ? `Lv. ${member.level}` : '-'}
              large
            />
            <StatField
              label="편지 제한 시간"
              value={
                stats?.letterReceiveBlockedUntil
                  ? formatDateTime(stats.letterReceiveBlockedUntil)
                  : '없음'
              }
            />
            <StatField
              label="알람 수신 여부"
              value={stats?.notificationEnabled == null ? '-' : stats.notificationEnabled ? 'ON' : 'OFF'}
            />
            <StatField
              label="접속 보상 수령 여부"
              value={stats?.isFirstAttendanceToday == null ? '-' : stats.isFirstAttendanceToday ? '미수령' : '수령'}
            />

            <StatField
              label="주간 분석 수신 여부"
              value={stats?.weeklyAnalysisEnabled == null ? '-' : stats.weeklyAnalysisEnabled ? 'ON' : 'OFF'}
            />
            <StatField label="주간 분석 말투" value={stats?.counselingTone} />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-normal leading-5 text-neutral-600">능력치별 레벨</span>

            <div className="grid grid-cols-5 gap-2">
              {abilityItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded border border-neutral-200 bg-neutral-50 p-3"
                >
                  <div className="text-xs font-normal leading-4 text-neutral-600">{item.label}</div>
                  <div className="mt-1 text-base font-semibold leading-6 text-neutral-950">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
