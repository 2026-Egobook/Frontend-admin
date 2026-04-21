import MemberStatusBadge from './MemberStatusBadge';

function InfoField({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-normal leading-5 text-neutral-600">{label}</span>
      <span className="text-base font-medium leading-6 text-neutral-950">{value}</span>
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
        {value}
      </span>
    </div>
  );
}

export default function MemberSummaryCard({ member }) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold leading-7 text-neutral-950">기본 정보</h2>

        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          <InfoField label="사용자 ID" value={member.id} />
          <InfoField label="계정 고유 코드" value={member.accountCode} />
          <InfoField label="이메일" value={member.email} />
          <InfoField label="생성 일시" value={member.createdAt} />
          <InfoField label="마지막 로그인" value={member.lastLoginAt} />

          <div className="flex flex-col gap-1">
            <span className="text-sm font-normal leading-5 text-neutral-600">계정 상태</span>
            <div>
              <MemberStatusBadge status={member.status} />
            </div>
          </div>

          <InfoField label="탈퇴 신청 일시" value={member.withdrawRequestedAt} />
          <InfoField label="데이터 전부 삭제 예정 일시" value={member.deleteScheduledAt} />
        </div>
      </div>

      <div className="border-t border-neutral-200 pt-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold leading-7 text-neutral-950">활동 통계</h2>

          <div className="grid grid-cols-4 gap-x-6 gap-y-4">
            <StatField label="일기 작성 수" value={member.activityStats.diaryCount} large />
            <StatField label="편지 작성 수" value={member.activityStats.letterCount} large />
            <StatField label="질문 답변 수" value={member.activityStats.answerCount} large />
            <StatField label="보유 잉크량" value={member.activityStats.inkAmount} large />

            <StatField label="고유 레벨" value={member.activityStats.level} />
            <StatField label="편지 제한 시간" value={member.activityStats.letterLimitTime} />
            <StatField label="알람 수신 여부" value={member.activityStats.alarmEnabled} />
            <StatField
              label="접속 보상 수령 여부"
              value={member.activityStats.attendanceRewardReceived}
            />

            <StatField
              label="주간 분석 수신 여부"
              value={member.activityStats.weeklyAnalysisEnabled}
            />
            <StatField label="주간 분석 말투" value={member.activityStats.weeklyTone} />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-normal leading-5 text-neutral-600">능력치별 레벨</span>

            <div className="grid grid-cols-5 gap-2">
              {member.abilityLevels.map((item) => (
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
