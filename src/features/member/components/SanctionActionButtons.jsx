export default function SanctionActionButtons({ onOpenApply, onOpenCancel }) {
  return (
    <section className="relative z-10 flex flex-col gap-4 border-t border-neutral-200 pt-6">
      <h2 className="text-lg font-semibold leading-7 text-neutral-950">제재 적용</h2>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onOpenApply}
          className="rounded bg-red-600 px-5 py-2.5 text-base font-medium leading-6 text-white"
        >
          7일 정지
        </button>

        <button
          type="button"
          onClick={onOpenCancel}
          className="rounded bg-neutral-600 px-5 py-2.5 text-base font-medium leading-6 text-white"
        >
          제재 취소
        </button>
      </div>
    </section>
  );
}
