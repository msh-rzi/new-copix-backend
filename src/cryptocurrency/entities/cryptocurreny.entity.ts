export class CryptocurrencyEntity {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  marketCap: number;
  marketCapRank: number;
  fullyDilutedValuation?: number | null;
  totalVolume: number;
  high24h: number;
  low24h: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  marketCapChange24h: number;
  marketCapChangePercentage24h: number;
  circulatingSupply: number;
  totalSupply?: number | null;
  maxSupply?: number | null;
  ath: number;
  athChangePercentage: number;
  athDate: Date;
  atl: number;
  atlChangePercentage: number;
  atlDate: Date;
  roi?: any | null;
  lastUpdated: Date;
}

export class CreateCryptoCurrencyEntity {
  id: string;
  symbol: string;
  name: string;
  image: string;
}
