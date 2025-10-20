import { Controller, Post, Body, HttpCode, HttpException, Get, Param } from '@nestjs/common'
import { CornService } from './corn.service'
import { BuyDto } from './dto/buy.dto'

@Controller('corn')
export class CornController {
  constructor(private readonly service: CornService) {}

  private sleep(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  @Post('buy')
  @HttpCode(200)
  async buy(@Body() body: BuyDto) {
    await this.sleep(800)
    const clientId = body?.clientId ?? 'anonymous'
    return { message: '🌽', clientId }
  }

  @Get('stats/:clientId')
  async stats(@Param('clientId') clientId: string){
    return { clientId, ...this.service.stats(clientId) }
  }
}
