import { useState } from 'react';
import Input from '@/shared/components/ui/Input';
import Button from '@/shared/components/ui/Button';
import useRegister from '@/features/auth/hooks/useRegister';

export default function RegisterForm({ onSwitchToLogin }) {
  const [form, setForm] = useState({ adminId: '', password: '' });
  const { isLoading, error, success, submitRegister } = useRegister();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await submitRegister(form);
  };

  if (success) {
    return (
      <div className="flex w-full flex-col items-start gap-6 rounded-[10px] border-4 border-black bg-white p-8">
        <h1 className="self-stretch text-2xl font-semibold leading-8 text-neutral-950">
          계정 등록 완료
        </h1>
        <p className="text-sm leading-6 text-neutral-600">
          계정이 등록되었습니다.
          <br />
          관리자가 해당 계정을 활성화한 후 로그인이 가능합니다.
        </p>
        <Button type="button" onClick={onSwitchToLogin} className="w-full">
          로그인으로 돌아가기
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-start gap-6 rounded-[10px] border-4 border-black bg-white p-8"
    >
      <h1 className="self-stretch text-2xl font-semibold leading-8 text-neutral-950">
        신규 계정 등록
      </h1>

      <p className="text-sm leading-5 text-neutral-500">
        등록 후 관리자 승인이 완료되어야 로그인할 수 있습니다.
      </p>

      <div className="flex w-full flex-col gap-2">
        <label htmlFor="reg-adminId" className="text-sm font-medium leading-5 text-neutral-950">
          아이디
        </label>
        <Input
          id="reg-adminId"
          name="adminId"
          placeholder="아이디를 입력하세요"
          value={form.adminId}
          onChange={handleChange}
        />
      </div>

      <div className="flex w-full flex-col gap-2">
        <label htmlFor="reg-password" className="text-sm font-medium leading-5 text-neutral-950">
          비밀번호
        </label>
        <Input
          id="reg-password"
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
        {isLoading ? '등록 중...' : '계정 등록'}
      </Button>

      <button
        type="button"
        onClick={onSwitchToLogin}
        className="self-center text-sm text-neutral-500 underline underline-offset-2"
      >
        로그인으로 돌아가기
      </button>
    </form>
  );
}
