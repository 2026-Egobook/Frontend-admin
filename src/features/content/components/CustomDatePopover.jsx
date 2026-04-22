import { useEffect, useRef, useState } from 'react';
import { FiCalendar, FiChevronDown, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { formatDate } from '../utils/dateUtils';
import CalendarPicker from './CalendarPicker';
import MonthPicker from './MonthPicker';

function DatePickerButton({ value, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-10 items-center gap-6 rounded border border-neutral-300 bg-white px-3 py-2"
    >
      <span className="text-base font-normal leading-5 text-black">{value}</span>
      <FiCalendar className="h-5 w-5 text-black" />
    </button>
  );
}

export default function CustomDatePopover({ value, onChange }) {
  const wrapperRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('day');
  const [tempDate, setTempDate] = useState(value ?? new Date());

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      if (!wrapperRef.current) return;

      if (!wrapperRef.current.contains(event.target)) {
        setOpen(false);
        setMode('day');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const closePopover = () => {
    setOpen(false);
    setMode('day');
  };

  const openPopover = () => {
    if (open) {
      closePopover();
      return;
    }

    setTempDate(value ?? new Date());
    setMode('day');
    setOpen(true);
  };

  const handleConfirm = () => {
    onChange?.(tempDate);
    closePopover();
  };

  return (
    <div ref={wrapperRef} className="relative">
      <DatePickerButton value={formatDate(value)} onClick={openPopover} />

      {open && (
        <div className="absolute left-0 top-12 z-30 w-64 overflow-hidden rounded border border-neutral-300 bg-white">
          <div className="flex h-12 items-center justify-between bg-white px-6 pt-4 pb-3 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)]">
            <button
              type="button"
              onClick={() => setMode((prev) => (prev === 'day' ? 'month' : 'day'))}
              className="flex items-center gap-0.5"
            >
              <span className="text-sm font-medium leading-6 tracking-tight text-black">
                {tempDate.getFullYear()}년 {tempDate.getMonth() + 1}월
              </span>
              <FiChevronDown className="h-5 w-5 text-black" />
            </button>

            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => {
                  if (mode === 'day') {
                    setTempDate(new Date(tempDate.getFullYear(), tempDate.getMonth() - 1, 1));
                  } else {
                    setTempDate(new Date(tempDate.getFullYear() - 1, tempDate.getMonth(), 1));
                  }
                }}
              >
                <FiChevronLeft className="h-5 w-5 text-black" />
              </button>

              <button
                type="button"
                onClick={() => {
                  if (mode === 'day') {
                    setTempDate(new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, 1));
                  } else {
                    setTempDate(new Date(tempDate.getFullYear() + 1, tempDate.getMonth(), 1));
                  }
                }}
              >
                <FiChevronRight className="h-5 w-5 text-black" />
              </button>
            </div>
          </div>

          {mode === 'day' ? (
            <CalendarPicker
              tempDate={tempDate}
              selectedDate={tempDate}
              onSelectDate={setTempDate}
            />
          ) : (
            <MonthPicker
              tempDate={tempDate}
              onSelectMonth={(month) => {
                setTempDate(new Date(tempDate.getFullYear(), month, 1));
                setMode('day');
              }}
            />
          )}

          <div className="flex items-center justify-end gap-2 bg-white pr-4 pt-2 pb-2.5">
            <button
              type="button"
              onClick={closePopover}
              className="flex h-9 w-20 items-center justify-center rounded px-2 py-2.5 text-sm font-medium uppercase leading-4 tracking-wider text-black"
            >
              취소
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              className="flex h-9 w-20 items-center justify-center rounded px-2 py-2.5 text-sm font-medium uppercase leading-4 tracking-wider text-black"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
