import type { StatsResponse } from '../types/api';

const DEFAULT_BASE = 'http://localhost:3333';

function getBase(apiBase?: string) {
  return apiBase ?? import.meta.env?.VITE_API_BASE ?? DEFAULT_BASE;
}

export async function buyCorn(apiBase: string | undefined, clientId: string) {
  const base = getBase(apiBase);

  const res = await fetch(`${base}/corn/buy`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clientId }),
  });

  return res;
}

export async function getStats(
  apiBase: string | undefined,
  clientId: string,
): Promise<StatsResponse> {
  const base = getBase(apiBase);
  const res = await fetch(`${base}/corn/stats/${encodeURIComponent(clientId)}`);
  if (!res.ok) throw new Error('Stats fetch failed');
  return (await res.json()) as StatsResponse;
}
