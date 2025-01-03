import axios from 'axios';
import {
  MarketCapResponse,
  MarketDataFilter,
  MarketData,
} from './market-data.types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MarketDataService {
  private readonly COINGECKO_API = 'https://api.coingecko.com/api/v3';
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private marketDataCache: MarketCapResponse | null = null;
  private lastCacheUpdate: number = 0;

  async getMarketData(filter: MarketDataFilter): Promise<MarketCapResponse> {
    if (this.shouldRefreshCache()) {
      await this.refreshMarketData();
    }

    const filteredData = this.filterMarketData(
      this.marketDataCache!.data,
      filter,
    );
    return {
      ...this.marketDataCache!,
      data: filteredData,
    };
  }

  private async refreshMarketData(): Promise<void> {
    try {
      const response = await axios.get(`${this.COINGECKO_API}/coins/markets`, {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 250,
          sparkline: false,
        },
      });

      this.marketDataCache = {
        data: response.data.map(this.transformCoinGeckoData),
        timestamp: Date.now(),
        totalMarketCap: response.data.reduce(
          (sum: number, coin: any) => sum + coin.market_cap,
          0,
        ),
        totalVolume24h: response.data.reduce(
          (sum: number, coin: any) => sum + coin.total_volume,
          0,
        ),
      };
      this.lastCacheUpdate = Date.now();
    } catch (error) {
      console.error('Failed to fetch market data:', error);
      throw error;
    }
  }

  private transformCoinGeckoData(coin: any): MarketData {
    return {
      symbol: coin.symbol.toUpperCase(),
      marketCap: coin.market_cap,
      volume24h: coin.total_volume,
      priceChange24h: coin.price_change_percentage_24h,
      lastUpdated: new Date(coin.last_updated),
    };
  }

  private filterMarketData(
    data: MarketData[],
    filter: MarketDataFilter,
  ): MarketData[] {
    let filtered = [...data];

    if (filter.symbols) {
      filtered = filtered.filter((coin) =>
        filter.symbols!.includes(coin.symbol),
      );
    }

    if (filter.minMarketCap) {
      filtered = filtered.filter(
        (coin) => coin.marketCap >= filter.minMarketCap!,
      );
    }

    if (filter.minVolume) {
      filtered = filtered.filter((coin) => coin.volume24h >= filter.minVolume!);
    }

    if (filter.sortBy) {
      filtered.sort((a, b) => {
        const multiplier = filter.order === 'desc' ? -1 : 1;
        return (a[filter.sortBy!] - b[filter.sortBy!]) * multiplier;
      });
    }

    if (filter.limit) {
      filtered = filtered.slice(0, filter.limit);
    }

    return filtered;
  }

  private shouldRefreshCache(): boolean {
    return (
      !this.marketDataCache ||
      Date.now() - this.lastCacheUpdate > this.CACHE_DURATION
    );
  }
}
// function Injectable(): (
//   target: typeof MarketDataService,
//   context: ClassDecoratorContext<typeof MarketDataService>,
// ) => void | typeof MarketDataService {
//   throw new Error('Function not implemented.');
// }
