const REPORT_LIST = [
  {
    reportId: 1,
    contentType: 'LETTER',
    contentTypeLabel: '편지',
    content: '진짜 레전드나쁜말',
    authorId: 42,
    reason: '비속어 또는 모욕적인 표현이 있어요',
    totalReportCount: 1,
    status: 'PENDING',
    statusLabel: '미처리',
    createdAt: '2026-04-09T10:23:00',
    isNew: true,
  },
  {
    reportId: 2,
    contentType: 'REPLY',
    contentTypeLabel: '답장',
    content: '평범한말',
    authorId: 27,
    reason: '비속어 또는 모욕적인 표현이 있어요',
    totalReportCount: 1,
    status: 'PENDING',
    statusLabel: '미처리',
    createdAt: '2026-04-08T15:42:00',
    isNew: false,
  },
  {
    reportId: 3,
    contentType: 'QUESTION',
    contentTypeLabel: '질문 답변',
    content: '매우매우나쁜말',
    authorId: 19,
    reason: '광고 또는 스팸 글이에요',
    totalReportCount: 4,
    status: 'SANCTION_COMPLETED',
    statusLabel: '제재완료',
    createdAt: '2026-04-08T11:18:00',
    isNew: false,
  },
  {
    reportId: 4,
    contentType: 'LETTER',
    contentTypeLabel: '편지',
    content: '부적절한 편지 내용',
    authorId: 51,
    reason: '부적절한 내용을 담고 있어요',
    totalReportCount: 1,
    status: 'REJECTED',
    statusLabel: '반려',
    createdAt: '2026-04-07T09:30:00',
    isNew: false,
  },
];

export async function getReportList({ contentType = 'ALL', status = 'ALL', sort = 'LATEST' }) {
  await new Promise((resolve) => setTimeout(resolve, 150));

  let filtered = [...REPORT_LIST];

  if (contentType !== 'ALL') {
    filtered = filtered.filter((item) => item.contentType === contentType);
  }

  if (status !== 'ALL') {
    filtered = filtered.filter((item) => item.status === status);
  }

  if (sort === 'LATEST') {
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  if (sort === 'REPORT_COUNT') {
    filtered.sort((a, b) => b.totalReportCount - a.totalReportCount);
  }

  return filtered;
}
