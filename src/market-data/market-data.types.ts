export interface MarketData {
   symbol: string;
   marketCap: number;
   volume24h: number;
   priceChange24h: number;
   lastUpdated: Date;
}

export interface MarketCapResponse {
   data: MarketData[];
   timestamp: number;
   totalMarketCap: number;
   totalVolume24h: number;
}

export interface MarketDataFilter {
   symbols?: string[];
   minMarketCap?: number;
   minVolume?: number;
   limit?: number;
   sortBy?: 'marketCap' | 'volume24h' | 'priceChange24h';
   order?: 'asc' | 'desc';
}
