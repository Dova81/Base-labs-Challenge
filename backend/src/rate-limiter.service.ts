import { Injectable } from '@nestjs/common';

@Injectable()
export class RateLimiterService {
  // store last buy timestamp per client (ms since epoch)
  private lastBuy = new Map<string, number>();
  // total purchases per client
  private totals = new Map<string, number>();

  // allow at most 1 buy per 60 seconds
  private windowMs = 60 * 1000;

  tryBuy(clientId: string) {
    const now = Date.now();
    const last = this.lastBuy.get(clientId) ?? 0;
    if (now - last < this.windowMs) {
      return false;
    }
    this.lastBuy.set(clientId, now);
    this.totals.set(clientId, (this.totals.get(clientId) ?? 0) + 1);
    return true;
  }

  getCount(clientId: string) {
    return this.totals.get(clientId) ?? 0;
  }

  getLastBuy(clientId: string) {
    return this.lastBuy.get(clientId) ?? null;
  }
}
