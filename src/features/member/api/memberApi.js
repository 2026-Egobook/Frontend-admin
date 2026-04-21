const MOCK_MEMBERS = [
  {
    id: "사용자IDID",
    email: "test@google.com",
    nickname: "사용자1",
    status: "ACTIVE",
    lastLoginAt: "2026-04-09 14:23",
    joinedAt: "2026-01-15",
  },
  {
    id: "사용자IDID",
    email: null,
    nickname: "사용자2",
    status: "SUSPENDED",
    lastLoginAt: "2026-04-08 10:15",
    joinedAt: "2026-02-20",
  },
  {
    id: "사용자IDID",
    email: "test2@google.com",
    nickname: "사용자3",
    status: "WITHDRAW_PENDING",
    lastLoginAt: "2026-04-07 18:42",
    joinedAt: "2025-12-10",
  },
];

export const getMemberList = async ({ keyword = "", status = "ALL" } = {}) => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const normalizedKeyword = keyword.trim().toLowerCase();

  return MOCK_MEMBERS.filter((member) => {
    const matchesStatus = status === "ALL" ? true : member.status === status;

    const matchesKeyword =
      normalizedKeyword === ""
        ? true
        : member.id.toLowerCase().includes(normalizedKeyword) ||
          (member.email || "").toLowerCase().includes(normalizedKeyword) ||
          member.nickname.toLowerCase().includes(normalizedKeyword);

    return matchesStatus && matchesKeyword;
  });
};