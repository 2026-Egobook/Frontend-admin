import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../routes/path';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown === 0) {
      navigate(PATH.LOGIN, { replace: true });
      return;
    }
    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-50">
      <p className="text-8xl font-bold text-neutral-200">404</p>
      <h1 className="text-2xl font-semibold text-neutral-950">페이지를 찾을 수 없습니다</h1>
      <p className="text-sm text-neutral-500">
        {countdown}초 후 로그인 페이지로 이동합니다.
      </p>
      <button
        type="button"
        onClick={() => navigate(PATH.LOGIN, { replace: true })}
        className="mt-2 h-10 rounded bg-black px-6 text-base font-medium text-white"
      >
        로그인 페이지로 이동
      </button>
    </div>
  );
}
