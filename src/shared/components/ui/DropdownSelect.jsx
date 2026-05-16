import { useEffect, useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { cn } from '@/shared/utils/cn';

export default function DropdownSelect({
  value,
  placeholder = '선택하기',
  options = [],
  onChange,
  className,
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div ref={wrapperRef} className={cn('relative w-full', className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded border border-neutral-300 bg-white px-3 py-2 text-sm font-medium leading-5 text-black',
          open && 'rounded-b-none'
        )}
      >
        <span>{selectedOption?.label || placeholder}</span>
        <FiChevronDown
          className={cn('h-4 w-4 text-neutral-600 transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-10 z-30 w-full overflow-hidden rounded-b border-x border-b border-neutral-300 bg-white">
          {options.map((option, index) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange?.(option.value);
                setOpen(false);
              }}
              className={cn(
                'flex h-10 w-full items-center px-3 py-2.5 text-left text-sm font-medium leading-5 text-black hover:bg-neutral-50',
                index > 0 && 'border-t border-neutral-300'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
