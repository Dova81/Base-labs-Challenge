import { Injectable, NestMiddleware } from '@nestjs/common'
// use any for request/response types to avoid requiring @types/express in this repo
type Req = any
type Res = any
type Next = any
import { RateLimiterService } from '../rate-limiter.service'

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
  constructor(private readonly rl: RateLimiterService) {}

  use(req: Req, res: Res, next: Next) {
    // apply only to POST /corn/buy callers should register this middleware accordingly
    const clientId = (req.body && req.body.clientId) || 'anonymous'

    // if allowed, record the buy attempt (tryBuy) and proceed
    if (this.rl.isAllowed(clientId)) {
      // record the buy time and increment totals
      this.rl.tryBuy(clientId)
      return next()
    }

    // otherwise, respond with 429
    res.status(429).json({ message: 'Too Many Requests' })
  }
}
