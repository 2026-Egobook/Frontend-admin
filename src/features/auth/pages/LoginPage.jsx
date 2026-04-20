import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-white px-4">
      <section className="w-full max-w-[466px]">
        <LoginForm />
      </section>
    </main>
  );
}