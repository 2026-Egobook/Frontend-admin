import { publicAPI } from '@/shared/api/apiInstance';

// 응답 래퍼가 data 또는 result 키를 사용하는 두 가지 패턴을 모두 처리
const unwrap = (response) => response.data?.data ?? response.data?.result ?? response.data;

export const getLetterStats = async ({ startDate, endDate }) => {
  const response = await publicAPI.get('/admin/letters/status', {
    params: { startDate, endDate },
  });
  const raw = unwrap(response);
  return {
    summary: {
      completedCount: raw.summary.sentCount,
      pendingCount: raw.summary.waitingCount,
      aiReplyCount: raw.summary.aiReplyCount,
      failedCount: raw.summary.failCount,
    },
    failureLogs: (raw.failLogs ?? []).map((log) => ({
      logId: log.logId,
      letterId: log.letterId,
      failedAt: log.failedAt,
      reason: log.reason,
    })),
  };
};

export const getWeeklyReportStats = async ({ startDate, endDate }) => {
  const response = await publicAPI.get('/admin/ai/weekly-report/status', {
    params: { startDate, endDate },
  });
  const raw = unwrap(response);
  return {
    summary: {
      completedCount: raw.summary.successCount,
      failedCount: raw.summary.failCount,
      scheduledCount: raw.summary.scheduledCount,
    },
    failureLogs: (raw.failLogs ?? []).map((log) => ({
      failureId: log.failId,
      userId: log.userId,
      failedAt: log.failedAt,
      reason: log.reason,
      checked: false,
    })),
  };
};

export const resendWeeklyReportFailures = async ({ failureIds }) => {
  const response = await publicAPI.post('/admin/ai/weekly-report/resend', {
    failIds: failureIds,
  });
  return unwrap(response);
};

export const getDailyPraiseStats = async ({ startDate, endDate }) => {
  const response = await publicAPI.get('/admin/ai/daily-praise/status', {
    params: { startDate, endDate },
  });
  const raw = unwrap(response);
  return {
    summary: {
      completedCount: raw.summary.successCount,
      failedCount: raw.summary.failCount,
      scheduledCount: raw.summary.scheduledCount,
    },
    dailyStats: (raw.dailyStats ?? []).map((row) => ({
      date: row.date,
      scheduledCount: row.scheduledCount,
      completedCount: row.successCount,
      failedCount: row.failCount,
    })),
    failureLogs: (raw.failLogs ?? []).map((log) => ({
      failureId: log.failId,
      userId: log.userId,
      failedAt: log.failedAt,
      reason: log.reason,
      checked: false,
    })),
  };
};

export const resendDailyPraiseFailures = async ({ failureIds }) => {
  const response = await publicAPI.post('/admin/ai/daily-praise/resend', {
    failIds: failureIds,
  });
  return unwrap(response);
};

export const getBadWordStats = async ({ startDate, endDate, type = 'ALL' }) => {
  const response = await publicAPI.get('/admin/ai/bad-words/status', {
    params: { startDate, endDate, type },
  });
  const raw = unwrap(response);
  return {
    summary: {
      blockedCount: raw.summary.blockedCount,
      blockedRate: `${raw.summary.blockRate}%`,
    },
    blockedTexts: (raw.blockedLogs ?? []).map((log) => ({
      blockId: log.blockId,
      userId: log.userId,
      contentType: log.type,
      createdAt: log.blockedAt,
      originalText: log.originalText,
      keywords: log.badWords ?? [],
      score: `${Math.round((log.score ?? 0) * 100)}%`,
    })),
  };
};
