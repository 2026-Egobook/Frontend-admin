import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Toast({ message, onClose, duration = 2500 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return createPortal(
    <div className="fixed bottom-6 left-1/2 z-[9999] animate-fade-in-up">
      <div className="rounded-lg bg-neutral-900 px-5 py-3 text-sm font-medium text-white shadow-lg">
        {message}
      </div>
    </div>,
    document.body,
  );
}
