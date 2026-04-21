export default function SanctionHistorySection({ sanctions }) {
  return (
    <section className="flex flex-col gap-2 border-t border-neutral-200 pt-4">
      <h3 className="text-sm font-medium leading-5 text-neutral-950">제재 이력</h3>

      <div className="flex flex-col gap-2">
        {sanctions.map((item, index) => {
          const isActive = item.statusLabel === '제재중';

          return (
            <div
              key={`${item.title}-${index}`}
              className={`rounded border px-3 py-3 ${
                isActive ? 'border-red-200 bg-red-50' : 'border-neutral-200 bg-neutral-50'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-medium leading-5 text-neutral-950">{item.title}</div>
                  <div className="mt-1 text-xs font-normal leading-4 text-neutral-600">
                    {item.description}
                  </div>
                  <div className="mt-1 text-xs font-normal leading-4 text-neutral-600">
                    {item.createdAt}
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`text-sm font-medium leading-5 ${
                      isActive ? 'text-red-600' : 'text-neutral-600'
                    }`}
                  >
                    {item.statusLabel}
                  </div>
                  <div className="text-xs font-normal leading-4 text-neutral-600">{item.endAt}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
