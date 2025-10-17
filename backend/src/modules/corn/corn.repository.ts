import { Injectable } from '@nestjs/common'
import { RateLimiterService } from '../../rate-limiter.service'

@Injectable()
export class CornRepository {
  constructor(private readonly rl: RateLimiterService) {}

  tryBuy(clientId: string) {
    return this.rl.tryBuy(clientId)
  }

  getCount(clientId: string) {
    return this.rl.getCount(clientId)
  }

  getLastBuy(clientId: string){
    return this.rl.getLastBuy(clientId)
  }
}
