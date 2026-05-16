import { useState } from 'react';
import { registerAdmin } from '@/features/auth/api/authApi';

export default function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitRegister = async ({ adminId, password }) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      await registerAdmin({ adminId, password });
      setSuccess(true);
    } catch (err) {
      const status = err.response?.status;
      if (status === 409) {
        setError('이미 존재하는 아이디입니다.');
      } else if (status === 400) {
        setError('아이디와 비밀번호를 모두 입력해주세요.');
      } else {
        setError('회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, success, submitRegister };
}
