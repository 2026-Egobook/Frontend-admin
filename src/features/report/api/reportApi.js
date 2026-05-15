import { publicAPI } from '@/shared/api/apiInstance';

const unwrap = (response) => response.data?.data ?? response.data?.result ?? response.data;

const REASON_LABEL = {
  ABUSE: '비속어 또는 모욕적인 표현이 있어요',
  SPAM: '광고 또는 스팸 글이에요',
  INAPPROPRIATE: '부적절한 내용을 담고 있어요',
  OTHER: '기타',
};

const STATUS_LABEL = {
  PENDING: '미처리',
  SANCTION_COMPLETED: '제재완료',
  REJECTED: '반려',
  RESOLVED: '처리완료',
  REFUSED: '반려',
};

function normalizeLetterItem(item) {
  return {
    reportId: item.reportId,
    contentType: 'LETTER',
    contentTypeLabel: '편지',
    content: item.letterContent,
    authorId: item.reporterId,
    reason: REASON_LABEL[item.reason] ?? item.reason,
    totalReportCount: item.reportCount,
    status: item.status ?? 'PENDING',
    statusLabel: STATUS_LABEL[item.status] ?? item.status ?? '미처리',
    createdAt: item.createdAt,
    contentId: item.letterId,
  };
}

function normalizeReplyItem(item) {
  return {
    reportId: item.reportId,
    contentType: 'REPLY',
    contentTypeLabel: '편지 답장',
    content: item.replyContent,
    authorId: item.reporterId,
    reason: REASON_LABEL[item.reason] ?? item.reason,
    totalReportCount: item.reportCount,
    status: item.status ?? 'PENDING',
    statusLabel: STATUS_LABEL[item.status] ?? item.status ?? '미처리',
    createdAt: item.createdAt,
    contentId: item.replyId,
  };
}

function normalizeAnswerItem(item) {
  return {
    reportId: item.reportId,
    contentType: 'ANSWER',
    contentTypeLabel: '질문 답변',
    content: item.answerContent,
    authorId: item.reporterId,
    reason: REASON_LABEL[item.reason] ?? item.reason,
    totalReportCount: item.reportCount,
    status: item.status ?? 'PENDING',
    statusLabel: STATUS_LABEL[item.status] ?? item.status ?? '미처리',
    createdAt: item.reportedAt,
    contentId: item.answerId,
  };
}

export async function getReportList({ contentType = 'ALL', page = 1, size = 20 } = {}) {
  const params = { page, size };

  if (contentType === 'LETTER') {
    const res = await publicAPI.get('/admin/reports/letters', { params });
    const raw = unwrap(res);
    return { content: (raw.content ?? []).map(normalizeLetterItem), hasNext: raw.hasNext ?? false };
  }

  if (contentType === 'REPLY') {
    const res = await publicAPI.get('/admin/reports/replies', { params });
    const raw = unwrap(res);
    return { content: (raw.content ?? []).map(normalizeReplyItem), hasNext: raw.hasNext ?? false };
  }

  if (contentType === 'ANSWER') {
    const res = await publicAPI.get('/admin/reports/answers', { params });
    const raw = unwrap(res);
    return { content: (raw.content ?? []).map(normalizeAnswerItem), hasNext: raw.hasNext ?? false };
  }

  // ALL: 세 엔드포인트 병렬 조회 후 최신순 병합
  const [letterRes, replyRes, answerRes] = await Promise.all([
    publicAPI.get('/admin/reports/letters', { params }),
    publicAPI.get('/admin/reports/replies', { params }),
    publicAPI.get('/admin/reports/answers', { params }),
  ]);

  const letters = (unwrap(letterRes).content ?? []).map(normalizeLetterItem);
  const replies = (unwrap(replyRes).content ?? []).map(normalizeReplyItem);
  const answers = (unwrap(answerRes).content ?? []).map(normalizeAnswerItem);

  const merged = [...letters, ...replies, ...answers].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  const hasNext =
    (unwrap(letterRes).hasNext ?? false) ||
    (unwrap(replyRes).hasNext ?? false) ||
    (unwrap(answerRes).hasNext ?? false);

  return { content: merged, hasNext };
}

export async function getReportDetail(contentType, reportId) {
  let res;
  let normalizer;

  if (contentType === 'LETTER') {
    res = await publicAPI.get(`/admin/reports/letters/${reportId}`);
    normalizer = (raw) => ({
      reportGroupId: raw.reportId,
      contentType: 'LETTER',
      contentTypeLabel: '편지',
      targetContentId: raw.letterId,
      targetContentIdLabel: '편지 ID',
      contentId: raw.letterId,
      totalReportCount: raw.reportCount,
      originalContent: raw.letterContent,
      memo: '',
      reports: [{ reportId: raw.reportId, reason: REASON_LABEL[raw.reason] ?? raw.reason, description: raw.description, reporterId: raw.reporterId, createdAt: raw.createdAt, status: raw.status ?? 'PENDING', statusLabel: STATUS_LABEL[raw.status] ?? '미처리' }],
    });
  } else if (contentType === 'REPLY') {
    res = await publicAPI.get(`/admin/reports/replies/${reportId}`);
    normalizer = (raw) => ({
      reportGroupId: raw.reportId,
      contentType: 'REPLY',
      contentTypeLabel: '편지 답장',
      targetContentId: raw.replyId,
      targetContentIdLabel: '답장 ID',
      contentId: raw.replyId,
      totalReportCount: raw.reportCount,
      originalContent: raw.replyContent,
      memo: '',
      reports: [{ reportId: raw.reportId, reason: REASON_LABEL[raw.reason] ?? raw.reason, description: raw.description, reporterId: raw.reporterId, createdAt: raw.createdAt, status: raw.status ?? 'PENDING', statusLabel: STATUS_LABEL[raw.status] ?? '미처리' }],
    });
  } else if (contentType === 'ANSWER') {
    res = await publicAPI.get(`/admin/reports/answers/${reportId}`);
    normalizer = (raw) => ({
      reportGroupId: raw.reportId,
      contentType: 'ANSWER',
      contentTypeLabel: '질문 답변',
      targetContentId: raw.answerId,
      targetContentIdLabel: '답변 ID',
      contentId: raw.answerId,
      totalReportCount: raw.reportCount,
      originalContent: raw.answerContent,
      memo: '',
      reports: [{ reportId: raw.reportId, reason: REASON_LABEL[raw.reason] ?? raw.reason, description: raw.description, reporterId: raw.reporterNickname ?? raw.reporterId, createdAt: raw.reportedAt, status: raw.status ?? 'PENDING', statusLabel: STATUS_LABEL[raw.status] ?? '미처리' }],
    });
  } else {
    return null;
  }

  return normalizer(unwrap(res));
}

export async function deleteReportedContent({ contentType, contentId }) {
  if (contentType === 'LETTER') {
    await publicAPI.delete(`/admin/reports/letters/${contentId}`);
  } else if (contentType === 'REPLY') {
    await publicAPI.delete(`/admin/reports/replies/${contentId}`);
  } else if (contentType === 'ANSWER') {
    await publicAPI.delete(`/admin/reports/answers/${contentId}`);
  }
}

// 아직 스펙 미제공 — 추후 연동
export async function updateReportStatus() {}
export async function rejectReportGroup() {}
export async function applyReportSanction() {}
export async function saveReportMemo() {}
