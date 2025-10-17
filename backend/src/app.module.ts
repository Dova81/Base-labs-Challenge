import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CornModule } from './modules/corn/corn.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [SharedModule, CornModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
