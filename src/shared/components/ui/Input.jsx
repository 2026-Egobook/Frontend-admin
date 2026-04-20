import { cn } from '@/shared/utils/cn';

export default function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'h-[61px] w-full rounded border border-neutral-300 px-4 text-lg text-neutral-950 outline-none',
        'placeholder:text-lg placeholder:text-neutral-950/50',
        'focus:border-black',
        className
      )}
      {...props}
    />
  );
}
