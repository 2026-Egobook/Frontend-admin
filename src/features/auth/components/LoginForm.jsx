import { useState } from 'react';
import Input from '@/shared/components/ui/Input';
import Button from '@/shared/components/ui/Button';
import useLogin from '@/features/auth/hooks/useLogin';

export default function LoginForm({ onSwitchToRegister }) {
  const [form, setForm] = useState({ adminId: '', password: '' });
  const { isLoading, error, submitLogin } = useLogin();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await submitLogin(form);
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
        <label htmlFor="adminId" className="text-sm font-medium leading-5 text-neutral-950">
          아이디
        </label>
        <Input
          id="adminId"
          name="adminId"
          placeholder="아이디를 입력하세요"
          value={form.adminId}
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

      {error && (
        <p className="w-full text-sm text-red-600">{error}</p>
      )}

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? '로그인 중...' : '로그인'}
      </Button>

      <button
        type="button"
        onClick={onSwitchToRegister}
        className="self-center text-sm text-neutral-500 underline underline-offset-2"
      >
        신규 계정 등록
      </button>
    </form>
  );
}
