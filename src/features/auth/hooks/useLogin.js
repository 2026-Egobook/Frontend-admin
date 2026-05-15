import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '@/features/auth/api/authApi';
import { tokenStorage } from '@/shared/utils/tokenStorage';
import { PATH } from '@/app/routes/path';

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submitLogin = async ({ adminId, password }) => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await loginAdmin({ adminId, password });
      tokenStorage.setTokens(data.accessToken, data.refreshToken);
      navigate(PATH.MEMBER_LIST, { replace: true });
    } catch (err) {
      const status = err.response?.status;
      if (status === 401) {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      } else if (status === 400) {
        setError('아이디와 비밀번호를 모두 입력해주세요.');
      } else {
        setError('로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, submitLogin };
}
