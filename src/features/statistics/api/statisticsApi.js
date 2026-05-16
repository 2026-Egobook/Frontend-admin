import { publicAPI } from '@/shared/api/apiInstance';

function formatDate(date) {
  if (!date) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const WITHDRAW_REASON_LABEL = {
  NOT_USED_OFTEN: '자주 사용 안함',
  LACK_OF_FUNCTION: '기능 부족',
  INCONVENIENT: '앱 사용 불편',
  HARD_TO_EARN_INK: '잉크 모으기 어려움',
  OTHER: '기타',
};

const DIARY_TYPE_LABEL = {
  EMOTION: '감정',
  WORRY: '고민',
  PRAISE: '칭찬',
  GRATITUDE: '감사',
};

function toPercent(ratio) {
  return Math.round(ratio * 1000) / 10;
}

export async function getDauMauStats({ startDate, endDate }) {
  const { data } = await publicAPI.get('/admin/stats/users/dau-mau', {
    params: { startDate: formatDate(startDate), endDate: formatDate(endDate) },
  });
  return (data.data?.data ?? []).map((item) => ({
    date: item.date,
    dau: item.dau,
    mau: item.mau,
  }));
}

export async function getRetentionStats() {
  const { data } = await publicAPI.get('/admin/stats/users/retention');
  return {
    day7: toPercent(data.data.day7RetentionRate),
    day30: toPercent(data.data.day30RetentionRate),
  };
}

export async function getJoinWithdrawStats({ startDate, endDate, unit = 'MONTH' }) {
  const { data } = await publicAPI.get('/admin/stats/users/join-withdraw', {
    params: { startDate: formatDate(startDate), endDate: formatDate(endDate), unit },
  });
  return (data.data?.data ?? []).map((item) => ({
    date: item.period,
    joined: item.join,
    left: item.withdraw,
  }));
}

export async function getWithdrawReasonStats({ startDate, endDate }) {
  const { data } = await publicAPI.get('/admin/stats/withdraw-reason', {
    params: { startDate: formatDate(startDate), endDate: formatDate(endDate) },
  });
  const result = data.data;
  return {
    totalCount: result.total,
    reasons: (result.data ?? []).map((item) => ({
      reason: WITHDRAW_REASON_LABEL[item.reason] ?? item.reason,
      count: item.count,
      percent: toPercent(item.ratio),
      examples: item.text,
    })),
  };
}

export async function getLetterGiveUpStats({ startDate, endDate }) {
  const { data } = await publicAPI.get('/admin/stats/letters/give-up', {
    params: { startDate: formatDate(startDate), endDate: formatDate(endDate) },
  });
  const result = data.data;
  return {
    totalLetterCount: result.total,
    giveUpCount: result.giveUp,
    giveUpRate: toPercent(result.giveUpRate),
  };
}

export async function getDiaryStats({ startDate, endDate }) {
  const { data } = await publicAPI.get('/admin/stats/diaries', {
    params: { startDate: formatDate(startDate), endDate: formatDate(endDate) },
  });
  const result = data.data;
  return {
    totalDiaryCount: result.total,
    diaryTypeStats: (result.data ?? []).map((item) => ({
      type: DIARY_TYPE_LABEL[item.type] ?? item.type,
      count: item.count,
    })),
  };
}

export async function getInkStats({ startDate, endDate, unit = 'MONTH' }) {
  const { data } = await publicAPI.get('/admin/stats/ink', {
    params: { startDate: formatDate(startDate), endDate: formatDate(endDate), unit },
  });
  return (data.data?.data ?? []).map((item) => ({
    date: item.period,
    issued: item.issued,
    consumed: item.consumed,
  }));
}
