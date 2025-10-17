import React from 'react';

type Props = {
  loading: boolean;
  onClick: () => void;
  children?: React.ReactNode;
};

export default function BuyButton({ loading, onClick, children }: Props) {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50"
    >
      {loading ? 'Procesando...' : children}
    </button>
  );
}
