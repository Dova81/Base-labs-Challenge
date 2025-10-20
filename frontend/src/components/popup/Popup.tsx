import React from 'react';

type Props = {
  message: string;
  onClose: () => void;
};

export default function CornerPopup({ message, onClose }: Props) {
  return (
    <div className="fixed top-6 right-6 bg-red-600 text-white px-4 py-3 rounded shadow-lg z-50">
      <div className="flex items-center">
        <div className="flex-1 text-sm">{message}</div>
        <button onClick={onClose} className="ml-3 text-white font-bold">
          ✕
        </button>
      </div>
    </div>
  );
}
