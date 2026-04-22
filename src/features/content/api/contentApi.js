const DAILY_PRAISE_STATS = {
  startDate: '2026-04-01',
  endDate: '2026-04-09',
  summary: {
    completedCount: 110,
    failedCount: 10,
    scheduledCount: 120,
  },
  dailyStats: [
    { date: '2026-04-01', scheduled: 20, completed: 18, failed: 2 },
    { date: '2026-04-02', scheduled: 25, completed: 24, failed: 1 },
    { date: '2026-04-03', scheduled: 22, completed: 20, failed: 2 },
    { date: '2026-04-04', scheduled: 18, completed: 17, failed: 1 },
    { date: '2026-04-05', scheduled: 19, completed: 17, failed: 2 },
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
