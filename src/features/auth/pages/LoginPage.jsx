import { useState } from 'react';
import LoginForm from '@/features/auth/components/LoginForm';
import RegisterForm from '@/features/auth/components/RegisterForm';

export default function LoginPage() {
  const [mode, setMode] = useState('login');

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-white px-4">
      <section className="w-full max-w-[466px]">
        {mode === 'login' ? (
          <LoginForm onSwitchToRegister={() => setMode('register')} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setMode('login')} />
        )}
      </section>
    </main>
  );
}
