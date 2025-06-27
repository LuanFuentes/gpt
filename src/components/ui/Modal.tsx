import { ReactNode } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: Props) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow w-96">
        <button className="float-right" onClick={onClose}>
          ✕
        </button>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
}
