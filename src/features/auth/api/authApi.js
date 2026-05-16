import { publicAPI } from '@/shared/api/apiInstance';

export async function loginAdmin({ adminId, password }) {
  const { data } = await publicAPI.post('/admin/auth/login', { adminId, password });
  return data.data;
}

export async function registerAdmin({ adminId, password }) {
  const { data } = await publicAPI.post('/admin/auth/register', { adminId, password });
  return data;
}

export async function reissueToken({ accessToken, refreshToken }) {
  const { data } = await publicAPI.post('/admin/auth/refresh', { accessToken, refreshToken });
  return data.data;
}
