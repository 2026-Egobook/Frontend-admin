export default function StatisticsCard({ children, className = '' }) {
  return (
    <section className={`rounded-[10px] border border-neutral-200 bg-white p-6 ${className}`}>
      {children}
    </section>
  );
}
