export default function AdminAuthLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-4">
      <div className="w-full max-w-[466px]">{children}</div>
    </div>
  );
}