import {
  CoinEntity,
  CoinHistoricalPriceEntity,
  CoinPriceEntity,
} from '../entities/cryptocurreny.entity';

export class CurrencyMapper {
  // Maps raw data to an array of CoinEntity
  static toCreateDomain(raw: any): CoinEntity[] {
    const cryptocurrency: CoinEntity[] = [];

    raw.forEach((data) => {
      const createCoin = new CoinEntity();
      createCoin.id = data.id;
      createCoin.symbol = data.symbol;
      createCoin.name = data.name;
      createCoin.imageUrl = data.image;
      createCoin.marketCapRank = data.market_cap_rank;
      cryptocurrency.push(createCoin);
    });

    return cryptocurrency;
  }

  // Maps raw historical chart data to CoinHistoricalPriceEntity[]
  static toCoinHistoricalChartData(
    raw: any, // Assuming raw is the API response for historical chart data
    coinId: string,
  ): CoinHistoricalPriceEntity[] {
    const historicalData: CoinHistoricalPriceEntity[] = [];

    raw.prices.forEach((price: [number, number], index: number) => {
      const data = new CoinHistoricalPriceEntity();
      data.coinId = coinId;
      data.date = new Date(price[0] * 1000);
      data.open = raw.open[index]?.[1] || 0; // Assuming open prices exist
      data.high = raw.high[index]?.[2] || 0; // Assuming high prices exist
      data.low = raw.low[index]?.[3] || 0; // Assuming low prices exist
      data.close = price[1]; // Assuming the price array represents closing prices
      data.volume = raw.total_volumes[index]?.[1] || 0;
      data.marketCap = raw.market_caps[index]?.[1] || 0;
      historicalData.push(data);
    });

    return historicalData;
  }

  // Maps raw market data to CoinPriceEntity[]
  static toMarketData(raw: any): CoinPriceEntity {
    const marketData = new CoinPriceEntity();
    marketData.coinId = raw.id;
    marketData.priceUsd = raw.usd;
    marketData.volume24h = raw.usd_24h_vol;
    marketData.marketCap = raw.usd_market_cap;
    marketData.change24h = raw.usd_24h_change;
    marketData.timestamp = new Date(raw.last_updated_at * 1000);
    return marketData;
  }
}
