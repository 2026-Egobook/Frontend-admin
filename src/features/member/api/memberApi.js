import { publicAPI } from '@/shared/api/apiInstance';

export const getMemberList = async ({ keyword = '', status = '', page = 1, size = 20 } = {}) => {
  const params = { page, size };
  if (keyword.trim()) params.keyword = keyword.trim();
  if (status) params.status = status;
  const { data } = await publicAPI.get('/admin/users', { params });
  return data.data;
};

export const getMemberDetail = async (userId) => {
  const { data } = await publicAPI.get(`/admin/users/${userId}`);
  return data.data;
};

export const getMemberStats = async (userId) => {
  const { data } = await publicAPI.get(`/admin/users/${userId}/stats`);
  return data.data;
};

export const getMemberReportHistory = async ({
  userId,
  reportDomainType,
  reportType,
  reportReason,
  reportStatus,
  page = 1,
  size = 10,
} = {}) => {
  const params = { page, size, reportDomainType };
  if (reportType) params.reportType = reportType;
  if (reportReason) params.reportReason = reportReason;
  if (reportStatus) params.reportStatus = reportStatus;
  const { data } = await publicAPI.get(`/admin/users/${userId}/report-history`, { params });
  return data.data;
};

export const getMemberRestrictions = async ({ userId, page = 1, size = 10, status } = {}) => {
  const params = { page, size };
  if (status) params.status = status;
  const { data } = await publicAPI.get(`/admin/users/${userId}/restrictions`, { params });
  return data.data;
};

export const applyMemberRestriction = async ({ userId, domainType, reason, description }) => {
  const { data } = await publicAPI.post(`/admin/users/${userId}/restrictions`, {
    domainType,
    reason,
    description,
  });
  return data;
};

export const cancelMemberRestriction = async (restrictionId) => {
  const { data } = await publicAPI.delete(`/admin/users/restrictions/${restrictionId}`);
  return data;
};
