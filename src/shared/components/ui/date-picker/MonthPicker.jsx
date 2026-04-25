export default function MonthPicker({ tempDate, onSelectMonth }) {
  const currentMonth = tempDate.getMonth();

  return (
    <div className="flex flex-col">
      {[0, 1, 2, 3].map((row) => (
        <div key={row} className="flex items-center justify-center gap-2 bg-white">
          {[0, 1, 2].map((col) => {
            const month = row * 3 + col;
            const active = month === currentMonth;

            return (
              <button
                key={month}
                type="button"
                onClick={() => onSelectMonth(month)}
                className={`flex h-9 w-16 items-center justify-center rounded-[30px] px-4 py-1.5 text-base font-normal leading-6 tracking-wide ${
                  active ? 'bg-black text-white' : 'text-black'
                }`}
              >
                {month + 1}월
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
