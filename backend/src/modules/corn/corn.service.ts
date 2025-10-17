import { Injectable } from '@nestjs/common'
import { CornRepository } from './corn.repository'

@Injectable()
export class CornService {
  constructor(private readonly repo: CornRepository) {}

  buy(clientId: string) {
    return this.repo.tryBuy(clientId)
  }

  stats(clientId: string){
    return {
      cornBought: this.repo.getCount(clientId),
      lastBuy: this.repo.getLastBuy(clientId)
    }
  }
}
