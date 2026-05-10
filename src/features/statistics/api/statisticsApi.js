const wait = () => new Promise((resolve) => setTimeout(resolve, 150));

export async function getUserStatistics() {
  await wait();

  return {
    dauMau: [
      { date: '2026-04-01', dau: 3100, mau: 8600 },
      { date: '2026-04-02', dau: 3200, mau: 8700 },
      { date: '2026-04-03', dau: 3150, mau: 8750 },
      { date: '2026-04-04', dau: 3300, mau: 8700 },
      { date: '2026-04-05', dau: 3400, mau: 8850 },
      { date: '2026-04-06', dau: 3350, mau: 8900 },
      { date: '2026-04-07', dau: 3500, mau: 8950 },
      { date: '2026-04-09', dau: 3250, mau: 9050 },
    ],
    joinLeave: [
      { date: '2026-01', joined: 320, left: 45 },
      { date: '2026-02', joined: 280, left: 60 },
      { date: '2026-03', joined: 520, left: 40 },
      { date: '2026-04', joined: 450, left: 50 },
    ],
    retention: {
      days: 7,
      rate: 68.4,
    },
  };
}

export async function getContentStatistics() {
  await wait();

  return {
    totalDiaryCount: 4820,
    diaryTypeStats: [
      { type: '감정', count: 1540 },
      { type: '고민', count: 1230 },
      { type: '칭찬', count: 1100 },
      { type: '감사', count: 950 },
    ],
    letterGiveUp: {
      totalLetterCount: 3200,
      giveUpCount: 576,
      giveUpRate: 18,
    },
  };
}

export async function getCurrencyStatistics() {
  await wait();

  return {
    inkStats: [
      { date: '2026-01', issued: 52000, consumed: 47300 },
      { date: '2026-02', issued: 48000, consumed: 51200 },
      { date: '2026-03', issued: 56000, consumed: 50800 },
      { date: '2026-04', issued: 50000, consumed: 44000 },
    ],
  };
}

export async function getWithdrawalStatistics() {
  await wait();

  return {
    totalCount: 340,
    reasons: [
      { reason: '자주 사용 X', percent: 30.9, count: 105 },
      { reason: '기능 부족', percent: 25.9, count: 88 },
      { reason: '앱 사용 불편', percent: 27.1, count: 92 },
      { reason: '잉크 모으기 어려움', percent: 18.8, count: 64 },
      { reason: '기타', percent: 15.0, count: 51, examples: ['기타 사유 1', '기타 사유 2'] },
    ],
  };
}