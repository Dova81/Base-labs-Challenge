import { Module } from '@nestjs/common'
import { CornController } from './corn.controller'
import { CornService } from './corn.service'
import { CornRepository } from './corn.repository'
import { SharedModule } from '../../shared/shared.module'

@Module({
  imports: [SharedModule],
  controllers: [CornController],
  providers: [CornService, CornRepository],
  exports: [CornService]
})
export class CornModule {}
