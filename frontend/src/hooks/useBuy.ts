import { useState } from 'react';
import { buyCorn, getStats } from '../services/cornService';
import type { StatsResponse } from '../types/api';

export default function useBuy(
  apiBase = import.meta.env?.VITE_API_BASE ?? 'http://localhost:3333',
) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [count, setCount] = useState(0);

  async function buy(clientId: string) {
    setLoading(true);
    setMessage('');
    try {
      const res = await buyCorn(apiBase, clientId);

      if (res.status === 200) {
        setMessage('Compra exitosa 🌽');
      } else if (res.status === 429) {
        const text = 'Demasiadas solicitudes — espera 1 minuto entre compras';
        setPopupMessage(text);
        setTimeout(() => setPopupMessage(''), 5000);
      } else {
        setMessage('Error: ' + res.status);
      }

      try {
        const data: StatsResponse = await getStats(apiBase, clientId);
        setCount(data.cornBought ?? 0);
      } catch (err) {
        // ignore stats errors for now
      }
    } catch (e: unknown) {
      setMessage('Error de red');
    } finally {
      setLoading(false);
    }
  }

  return { buy, loading, message, popupMessage, count };
}
