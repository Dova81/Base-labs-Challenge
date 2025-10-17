import React, { useState } from 'react';
import BuyButton from './components/BuyButton';
import CornerPopup from './components/Popup';
import useBuy from './hooks/useBuy';

export default function App() {
  const [clientId, setClientId] = useState('client-1');
  const { buy, loading, message, popupMessage, count } = useBuy();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow p-6 rounded">
        <h1 className="text-2xl font-bold mb-4">Bob&apos;s Corn 🌽</h1>
        <label className="block text-sm font-medium text-gray-700">Client ID</label>
        <input
          value={clientId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClientId(e.target.value)}
          className="mt-1 mb-4 block w-full border rounded p-2"
        />
        <BuyButton loading={loading} onClick={() => buy(clientId)}>
          Comprar 1 corn
        </BuyButton>
        {popupMessage && (
          <CornerPopup
            message={popupMessage}
            onClose={() => {
              /* noop: handled in hook */
            }}
          />
        )}
        {message && <p className="mt-4 text-sm">{message}</p>}
        {count > 0 && (
          <p className="mt-2 text-sm">
            Total comprado: <strong>{count}</strong>
          </p>
        )}
        <p className="mt-4 text-xs text-gray-500">
          La política permite 1 corn por cliente por minuto.
        </p>
      </div>
    </div>
  );
}
