import { RateLimiterService } from './rate-limiter.service'

describe('RateLimiterService', () => {
  let rl: RateLimiterService

  beforeEach(() => {
    rl = new RateLimiterService()
  })

  test('allows first buy and blocks immediate second', () => {
    const client = 'test-client'
    expect(rl.tryBuy(client)).toBe(true)
    expect(rl.tryBuy(client)).toBe(false)
  })

  test('isAllowed reflects window timing', () => {
    const client = 'another-client'
    expect(rl.isAllowed(client)).toBe(true)
    // record buy
    rl.tryBuy(client)
    expect(rl.isAllowed(client)).toBe(false)
  })

  test('getCount increments after buys', () => {
    const client = 'count-client'
    expect(rl.getCount(client)).toBe(0)
    rl.tryBuy(client)
    expect(rl.getCount(client)).toBe(1)
  })
})
