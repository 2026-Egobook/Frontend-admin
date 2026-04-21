import { createPortal } from 'react-dom';

export default function BaseModal({ open, onClose, children }) {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 w-full max-w-[384px] rounded-[10px] bg-white shadow-lg">
        {children}
      </div>
    </div>,
    document.body
  );
}
