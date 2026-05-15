import axios from 'axios';
import { tokenStorage } from '@/shared/utils/tokenStorage';

export const publicAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

publicAPI.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

publicAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const accessToken = tokenStorage.getAccessToken();
      const refreshToken = tokenStorage.getRefreshToken();

      if (!refreshToken) {
        tokenStorage.clearTokens();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL || ''}/admin/auth/reissue`,
          { accessToken, refreshToken },
          { headers: { 'Content-Type': 'application/json' } },
        );

        tokenStorage.setTokens(data.accessToken, data.refreshToken ?? refreshToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return publicAPI(originalRequest);
      } catch {
        tokenStorage.clearTokens();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
