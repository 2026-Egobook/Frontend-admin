import { useState } from 'react';
import Input from '@/shared/components/ui/Input';
import Button from '@/shared/components/ui/Button';
import useLogin from '@/features/auth/hooks/useLogin';

export default function LoginForm() {
  const [form, setForm] = useState({
    loginId: '',
    password: '',
  });

  const { isLoading, submitLogin } = useLogin();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await submitLogin(form);

      // TODO: 로그인 성공 시 페이지 이동 처리
    } catch {
      // TODO: 에러 메시지 UI로 보여주기
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-start gap-6 rounded-[10px] border-4 border-black bg-white p-8"
    >
      <h1 className="self-stretch text-2xl font-semibold leading-8 text-neutral-950">
        관리자 로그인
      </h1>

      <div className="flex w-full flex-col gap-2">
        <label htmlFor="loginId" className="text-sm font-medium leading-5 text-neutral-950">
          아이디
        </label>
        <Input
          id="loginId"
          name="loginId"
          placeholder="아이디를 입력하세요"
          value={form.loginId}
          onChange={handleChange}
        />
      </div>

      <div className="flex w-full flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium leading-5 text-neutral-950">
          비밀번호
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? '로그인 중...' : '로그인'}
      </Button>
    </form>
  );
}
