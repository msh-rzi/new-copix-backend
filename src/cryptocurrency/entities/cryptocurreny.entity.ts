export class CoinEntity {
  id: string;
  symbol: string;
  name: string;
  imageUrl?: string;
  marketCapRank?: number;
}

export class CoinPriceEntity {
  coinId: string;
  priceUsd: number;
  volume24h?: number;
  marketCap?: number;
  change24h?: number;
  timestamp: Date;
}

export class CoinHistoricalPriceEntity {
  id: number;
  coinId: string;
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
  marketCap?: number;
}

// export class CreateCryptoCurrencyEntity {
//   id: string;
//   symbol: string;
//   name: string;
//   image: string;
// }

// export class CoinHistoricalChartDataEntity {
//   prices: number[];
//   market_caps: number[];
//   total_volumes: number[];
// }

// export class DBCoinHistoricalChartDataEntity {
//   coinId: string;
//   timestamp: Date;
//   price: number;
//   market_caps: number;
//   total_volumes: number;
// }
