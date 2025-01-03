import { CoinHistoricalPriceEntity } from '../entities/cryptocurreny.entity';

export class HistoricalPriceMapper {
  // Maps raw OHLC and market data to CoinHistoricalPriceEntity[]
  static toCoinHistoricalChartData(
    ohlcData: [number, number, number, number, number][], // Array of OHLC data points
    historicalData: {
      market_caps: [number, number][];
      total_volumes: [number, number][];
    }, // Market caps and volumes data
    coinId: string,
  ): CoinHistoricalPriceEntity[] {
    return ohlcData
      .map(([timestamp, open, high, low, close]) => {
        const volume = historicalData.total_volumes.find(
          ([time]) => time === timestamp,
        )?.[1];
        const marketCap = historicalData.market_caps.find(
          ([time]) => time === timestamp,
        )?.[1];

        if (volume === null || marketCap === null) {
          return null; // Skip invalid entries
        }

        const entity = new CoinHistoricalPriceEntity();
        entity.coinId = coinId;
        entity.date = new Date(timestamp); // Convert timestamp to Date
        entity.open = open;
        entity.high = high;
        entity.low = low;
        entity.close = close;
        entity.volume = volume;
        entity.marketCap = marketCap;

        return entity;
      })
      .filter(
        (data) =>
          data.volume !== null &&
          data.volume !== undefined &&
          data.marketCap !== null &&
          data.marketCap !== undefined,
      );
  }
}
