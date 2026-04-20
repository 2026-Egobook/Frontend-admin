import { cn } from '@/shared/utils/cn';

export default function Button({
  type = 'button',
  children,
  className,
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        'flex w-full items-center justify-center rounded bg-black px-4 py-[15px] text-lg font-medium leading-7 text-white transition',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
