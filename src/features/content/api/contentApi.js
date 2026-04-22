const DAILY_PRAISE_STATS = {
  startDate: '2026-04-01',
  endDate: '2026-04-09',
  summary: {
    completedCount: 110,
    failedCount: 10,
    scheduledCount: 120,
  },
  dailyStats: [
    {
      date: '2026-04-01',
      scheduledCount: 20,
      completedCount: 18,
      failedCount: 2,
    },
    {
      date: '2026-04-02',
      scheduledCount: 25,
      completedCount: 24,
      failedCount: 1,
    },
    {
      date: '2026-04-03',
      scheduledCount: 22,
      completedCount: 20,
      failedCount: 2,
    },
    {
      date: '2026-04-04',
      scheduledCount: 18,
      completedCount: 17,
      failedCount: 1,
    },
    {
      date: '2026-04-05',
      scheduledCount: 19,
      completedCount: 17,
      failedCount: 2,
    },
    {
      date: '2026-04-06',
      scheduledCount: 10,
      completedCount: 9,
      failedCount: 1,
    },
    {
      date: '2026-04-07',
      scheduledCount: 8,
      completedCount: 7,
      failedCount: 1,
    },
    {
      date: '2026-04-08',
      scheduledCount: 9,
      completedCount: 8,
      failedCount: 1,
    },
    {
      date: '2026-04-09',
      scheduledCount: 9,
      completedCount: 8,
      failedCount: 1,
    },
  ],
  failureLogs: [
    {
      failureId: 1,
      userId: 35,
      failedAt: '2026-04-01T09:01:12',
      reason: 'FCM_TOKEN_NOT_FOUND',
      checked: true,
    },
    {
      failureId: 2,
      userId: 47,
      failedAt: '2026-04-01T09:02:44',
      reason: 'AI_RESPONSE_TIMEOUT',
      checked: false,
    },
    {
      failureId: 3,
      userId: 52,
      failedAt: '2026-04-02T10:15:30',
      reason: 'FCM_TOKEN_NOT_FOUND',
      checked: false,
    },
  ],
};

const WEEKLY_REPORT_STATS = {
  startDate: '2026-04-01',
  endDate: '2026-04-09',
  summary: {
    completedCount: 72,
    failedCount: 8,
    scheduledCount: 80,
  },
  failureLogs: [
    {
      failureId: 101,
      userId: 12,
      failedAt: '2026-04-03T08:10:11',
      reason: 'USER_INACTIVE',
      checked: true,
    },
    {
      failureId: 102,
      userId: 23,
      failedAt: '2026-04-05T09:22:33',
      reason: 'FCM_TOKEN_NOT_FOUND',
      checked: false,
    },
  ],
};

export const getDailyPraiseStats = async ({ startDate, endDate }) => {
  await new Promise((resolve) => setTimeout(resolve, 150));

  return {
    ...DAILY_PRAISE_STATS,
    startDate: startDate || DAILY_PRAISE_STATS.startDate,
    endDate: endDate || DAILY_PRAISE_STATS.endDate,
  };
};

export const resendDailyPraiseFailures = async ({ failureIds }) => {
  await new Promise((resolve) => setTimeout(resolve, 150));

  return {
    success: true,
    resentFailureIds: failureIds,
  };
};

export const getWeeklyReportStats = async ({ startDate, endDate }) => {
  await new Promise((resolve) => setTimeout(resolve, 150));

  return {
    ...WEEKLY_REPORT_STATS,
    startDate: startDate || WEEKLY_REPORT_STATS.startDate,
    endDate: endDate || WEEKLY_REPORT_STATS.endDate,
  };
};

export const resendWeeklyReportFailures = async ({ failureIds }) => {
  await new Promise((resolve) => setTimeout(resolve, 150));

  return {
    success: true,
    resentFailureIds: failureIds,
  };
};
