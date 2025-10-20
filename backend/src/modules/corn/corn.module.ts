import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { CornController } from './corn.controller'
import { CornService } from './corn.service'
import { CornRepository } from './corn.repository'
import { SharedModule } from '../../shared/shared.module'
import { RateLimiterMiddleware } from '../../middleware/rate-limiter.middleware'

@Module({
  imports: [SharedModule],
  controllers: [CornController],
  providers: [CornService, CornRepository],
  exports: [CornService]
})
export class CornModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RateLimiterMiddleware)
      .forRoutes({ path: 'corn/buy', method: RequestMethod.POST })
  }
}
