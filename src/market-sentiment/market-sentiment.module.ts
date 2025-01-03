import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MarketSentimentController } from './market-sentiment.controller';
import { MarketSentimentService } from './market-sentiment.service';

@Module({
  imports: [HttpModule],
  controllers: [MarketSentimentController],
  providers: [MarketSentimentService],
})
export class MarketSentimentModule {}
