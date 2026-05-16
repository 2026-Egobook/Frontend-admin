function PaginationButton({ onClick, disabled, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-8 min-w-8 items-center justify-center rounded border border-neutral-300 px-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

export default function Pagination({ page, hasNext, onChange }) {
  return (
    <div className="flex items-center justify-center gap-1">
      <PaginationButton onClick={() => onChange(page - 1)} disabled={page === 1}>
        ‹
      </PaginationButton>
      <span className="flex h-8 min-w-8 items-center justify-center rounded bg-black px-2 text-sm font-medium text-white">
        {page}
      </span>
      <PaginationButton onClick={() => onChange(page + 1)} disabled={!hasNext}>
        ›
      </PaginationButton>
    </div>
  );
}
