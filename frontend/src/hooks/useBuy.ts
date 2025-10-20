import { useState } from 'react';
import { buyCorn, getStats } from '../services/cornService';
import type { StatsResponse } from '../types/api';

export default function useBuy(
  apiBase = import.meta.env?.VITE_API_BASE ?? 'http://localhost:3333',
) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [count, setCount] = useState(0);



  async function buy(clientId: string) {
    setLoading(true);
    setMessage('');
    try {
      const res = await buyCorn(apiBase, clientId);

      if (res.status === 200) {
        setMessage('Compra exitosa 🌽');
      } else if (res.status === 429) {
        setError(true);
      } else {
        setMessage('Error: ' + res.status);
      }

      try {
        const data: StatsResponse = await getStats(apiBase, clientId);
        setCount(data.cornBought ?? 0);
      } catch (err) {
      }
    } catch (e: unknown) {
      setMessage('Error de red');
    } finally {
      setLoading(false);
    }
  }

  function closePopup() {
    setError(false);
  }

  return { buy, loading, message, error, count, closePopup };
}
