const MOCK_MEMBERS = [
  {
    id: '사용자IDID',
    email: 'test@google.com',
    nickname: '사용자1',
    status: 'ACTIVE',
    lastLoginAt: '2026-04-09 14:23',
    joinedAt: '2026-01-15',
  },
  {
    id: '사용자IDID2',
    email: null,
    nickname: '사용자2',
    status: 'SUSPENDED',
    lastLoginAt: '2026-04-08 10:15',
    joinedAt: '2026-02-20',
  },
];

const MOCK_MEMBER_DETAIL = {
  id: '사용자IDID',
  accountCode: '계정고유코드코드',
  email: 'test@google.com',
  createdAt: '2026-01-15 10:30:25',
  lastLoginAt: '2026-04-09 14:23:18',
  status: 'ACTIVE',
  withdrawRequestedAt: '-',
  deleteScheduledAt: '-',

  activityStats: {
    diaryCount: 145,
    letterCount: 89,
    answerCount: 67,
    inkAmount: 2340,
    level: 'Lv. 12',
    letterLimitTime: '23:12',
    alarmEnabled: 'ON',
    attendanceRewardReceived: '수령',
    weeklyAnalysisEnabled: 'ON',
    weeklyTone: 'SOFT',
  },

  abilityLevels: [
    { label: '공감성', value: 'Lv. 8' },
    { label: '자존감', value: 'Lv. 10' },
    { label: '성실함', value: 'Lv. 6' },
    { label: '긍정사고', value: 'Lv. 9' },
    { label: '감정조절', value: 'Lv. 7' },
  ],

  reportSummary: {
    reportedCount: '5회',
    receivedCount: '8회',
    suspensionCount: '1회',
  },

  reportsReceived: [
    {
      category: '편지',
      title: '나쁜말 진짜 나쁜 말 말도 못하게 나쁜 말',
      totalCount: 2,
      summaryStatus: '처리 대기중',
      items: [
        {
          type: '신고받음',
          reportId: 12,
          reason: '비속어 또는 모욕적인 표현이 있어요',
          createdAt: '2026-03-23T10:00:00',
          status: 'PENDING',
        },
        {
          type: '신고받음',
          reportId: 13,
          reason: '비속어 또는 모욕적인 표현이 있어요',
          createdAt: '2026-03-22T14:30:00',
          status: 'RESOLVED',
        },
      ],
    },
    {
      category: '질문 답변',
      title: '부적절한 매우매우 부적절한 답변 답변',
      totalCount: 1,
      summaryStatus: '처리 대기중',
      items: [
        {
          type: '신고받음',
          reportId: 78,
          reason: '부적절한 내용을 담고 있어요',
          createdAt: '2026-03-20T11:20:45',
          status: 'PENDING',
        },
      ],
    },
  ],

  reportsSent: [
    {
      category: '편지',
      title: '스팸 광고 나쁜 글 스팸 광고 나쁜 글 스팸 광고 나쁜 글',
      totalCount: 1,
      summaryStatus: '',
      items: [
        {
          type: '신고함',
          reportId: 45,
          reason: '광고 또는 스팸 글이에요',
          createdAt: '2026-03-21T15:30:00',
          status: 'RESOLVED',
        },
      ],
    },
  ],

  sanctions: [
    {
      title: '질문 답변 - 부적절한 답변 반복',
      description: '질문 답변에서 반복적으로 부적절한 내용 작성',
      createdAt: '2026-03-10 15:30:00',
      endAt: '~2026-03-17 15:30:00',
      statusLabel: '제재중',
      domain: 'QUESTION',
    },
    {
      title: '편지 - 비속어 사용',
      description: '편지에서 비속어 및 모욕적 표현 사용',
      createdAt: '2026-02-20 10:00:00',
      endAt: '~2026-02-27 10:00:00',
      statusLabel: '제재중',
      domain: 'LETTER',
    },
    {
      title: '편지 - 비속어 사용',
      description: '편지에서 비속어 및 모욕적 표현 사용',
      createdAt: '2026-02-20 10:00:00',
      endAt: '~2026-02-27 10:00:00',
      statusLabel: '취소됨',
      domain: 'LETTER',
    },
  ],

  activeSanctionDomains: [
    { label: '편지', value: 'LETTER' },
    { label: '질문 답변', value: 'QUESTION' },
  ],
};

export const getMemberList = async ({ keyword = '', status = 'ALL' } = {}) => {
  await new Promise((resolve) => setTimeout(resolve, 150));

  const normalizedKeyword = keyword.trim().toLowerCase();

  return MOCK_MEMBERS.filter((member) => {
    const matchesStatus = status === 'ALL' ? true : member.status === status;
    const matchesKeyword =
      normalizedKeyword === ''
        ? true
        : member.id.toLowerCase().includes(normalizedKeyword) ||
          (member.email || '').toLowerCase().includes(normalizedKeyword) ||
          member.nickname.toLowerCase().includes(normalizedKeyword);

    return matchesStatus && matchesKeyword;
  });
};

export const getMemberDetail = async (memberId) => {
  await new Promise((resolve) => setTimeout(resolve, 150));

  return {
    ...MOCK_MEMBER_DETAIL,
    id: memberId || MOCK_MEMBER_DETAIL.id,
  };
};

export const updateReportStatus = async ({ memberId, reportId, status }) => {
  await new Promise((resolve) => setTimeout(resolve, 150));

  return {
    memberId,
    reportId,
    status,
    success: true,
  };
};

export const applyMemberSanction = async ({ memberId, domain, reason, description }) => {
  await new Promise((resolve) => setTimeout(resolve, 150));

  return {
    memberId,
    domain,
    reason,
    description,
    success: true,
  };
};

export const cancelMemberSanction = async ({ memberId, domain }) => {
  await new Promise((resolve) => setTimeout(resolve, 150));

  return {
    memberId,
    domain,
    success: true,
  };
};
