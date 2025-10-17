export interface StatsResponse {
  cornBought: number;
  // timestamp (ms since epoch) of last successful buy, or null if none
  lastBuy?: number | null;
}
