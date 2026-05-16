import { createPortal } from 'react-dom';

export default function BaseModal({ open, onClose, children, className = 'max-w-[480px]' }) {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="absolute inset-0" onClick={onClose} />

      <div className={`relative z-10 w-full rounded-[10px] bg-white shadow-lg ${className}`}>
        {children}
      </div>
    </div>,
    document.body
  );
}