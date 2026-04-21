import { cn } from '@/shared/utils/cn';

const toneClassMap = {
  green: 'bg-green-100 text-green-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  red: 'bg-red-100 text-red-800',
  orange: 'bg-orange-100 text-orange-800',
  blue: 'bg-blue-100 text-blue-800',
  gray: 'bg-neutral-100 text-neutral-700',
};

export default function StatusChip({ children, tone = 'gray', className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded px-2 py-0.5 text-xs font-medium leading-4',
        toneClassMap[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
