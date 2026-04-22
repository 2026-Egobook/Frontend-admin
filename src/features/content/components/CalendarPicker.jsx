import { useMemo } from 'react';
import { getCalendarDays, isSameDate, WEEK_DAYS } from '../utils/dateUtils';

export default function CalendarPicker({ tempDate, selectedDate, onSelectDate }) {
  const today = new Date();
  const days = useMemo(() => getCalendarDays(tempDate), [tempDate]);

  return (
    <>
      <div className="flex h-8 items-start bg-white px-4">
        {WEEK_DAYS.map((day) => (
          <div
            key={day.key}
            className="flex h-8 w-8 items-center justify-center text-xs font-normal tracking-wide text-black"
          >
            {day.label}
          </div>
        ))}
      </div>

      <div className="bg-white px-4 pb-2">
        {Array.from({ length: days.length / 7 }).map((_, weekIndex) => (
          <div key={`week-${weekIndex}`} className="flex items-start">
            {days.slice(weekIndex * 7, weekIndex * 7 + 7).map(({ date, currentMonth }) => {
              const isToday = isSameDate(date, today);
              const isSelected = isSameDate(date, selectedDate);

              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  onClick={() => onSelectDate(date)}
                  className={`relative flex h-8 w-8 items-center justify-center text-sm font-normal leading-5 tracking-tight ${
                    currentMonth ? 'text-black' : 'text-black/40'
                  }`}
                >
                  {isSelected && <span className="absolute inset-[1px] rounded-full bg-black" />}

                  {!isSelected && isToday && (
                    <span className="absolute inset-[1px] rounded-full border border-black bg-white" />
                  )}

                  <span className={`relative z-10 ${isSelected ? 'text-white' : ''}`}>
                    {date.getDate()}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
