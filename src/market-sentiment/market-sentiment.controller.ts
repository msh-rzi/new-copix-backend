import { Controller, Get, Query } from '@nestjs/common';
import { MarketSentimentService } from './market-sentiment.service';

@Controller('market-sentiment')
export class MarketSentimentController {
  constructor(
    private readonly marketSentimentService: MarketSentimentService,
  ) {}

  @Get('fear-greed-index')
  getFearGreedIndex() {
    return this.marketSentimentService.fetchFearGreedIndex();
  }

  @Get('news-sentiment')
  getNewsSentiment(@Query('keywords') keywords: string) {
    return this.marketSentimentService.fetchNewsSentiment(keywords);
  }
}
