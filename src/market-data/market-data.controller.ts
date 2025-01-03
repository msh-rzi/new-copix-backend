import { Controller, Get, Query } from '@nestjs/common';
import { MarketDataService } from './market-data.service';
import { MarketDataFilter } from './market-data.types';

@Controller('api/market-data')
export class MarketDataController {
  constructor(private readonly marketDataService: MarketDataService) {}

  @Get()
  async getMarketData(
    @Query('symbols') symbols?: string,
    @Query('minMarketCap') minMarketCap?: string,
    @Query('minVolume') minVolume?: string,
    @Query('limit') limit?: string,
    @Query('sortBy') sortBy?: 'marketCap' | 'volume24h' | 'priceChange24h',
    @Query('order') order?: 'asc' | 'desc',
  ) {
    const filter: MarketDataFilter = {
      symbols: symbols?.split(','),
      minMarketCap: minMarketCap ? parseFloat(minMarketCap) : undefined,
      minVolume: minVolume ? parseFloat(minVolume) : undefined,
      limit: limit ? parseInt(limit) : undefined,
      sortBy,
      order,
    };

    return await this.marketDataService.getMarketData(filter);
  }
}
