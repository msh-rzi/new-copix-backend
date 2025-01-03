import { PrismaService } from './../../prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { axiosGateway } from '../utils/axiosGateway';
import { writeFile } from 'src/utils/writeFile';
import { readFile } from 'src/utils/readFile';
import { HistoricalPriceMapper } from '../mapper/historical-price.mapper';

type HisoricalDataResponse = {
  prices: [timestamp: number, price: number][];
  market_caps: [timestamp: number, marketCap: number][];
  total_volumes: [timestamp: number, totalVolumn: number][];
};

type OHLCDataPoint = [
  timestamp: number, // Unix timestamp in milliseconds
  open: number, // Opening price
  high: number, // Highest price during the period
  low: number, // Lowest price during the period
  close: number, // Closing price
];
type OHLCChartDataResponse = OHLCDataPoint[];

@Injectable()
export class HistoricalPriceCryptocurrencyRepository {
  private readonly logger = new Logger(
    HistoricalPriceCryptocurrencyRepository.name,
  );

  constructor(private readonly prisma: PrismaService) {}

  directory = './src/cryptocurrency/static/';

  async getChartData(
    id: string,
    type: 'market_chart' | 'ohlc',
    vs_currency: string = 'usd',
    days: number = 365,
    readFromFile?: boolean,
  ) {
    try {
      const url = `https://api.coingecko.com/api/v3/coins/${id}/${type}?vs_currency=${vs_currency}&days=${days}&precision=11`;
      const filePath = `${this.directory}${id}-${type}-${vs_currency}-${days}.json`;

      if (readFromFile) {
        const data = await readFile(filePath);
        return data;
      }

      const res = await axiosGateway({ url });
      const data = res.data;
      await writeFile(filePath, data);

      return data;
    } catch (error) {
      this.logger.error(`Error fetching or saving ${type} data`, error.stack);
      throw new Error(`Failed to fetch ${type} data: ` + error.message);
    }
  }

  async getHistoricalData(
    id: string,
    vs_currency: string = 'usd',
    days: number = 365,
    readFromFile?: boolean,
  ) {
    try {
      const data: HisoricalDataResponse = await this.getChartData(
        id,
        'market_chart',
        vs_currency,
        days,
        readFromFile,
      );

      return data;
    } catch (error) {
      this.logger.error('Error fetching or saving market data', error.stack);
      throw new Error('Failed to fetch market data: ' + error.message);
    }
  }

  async getOHLCChartData(
    id: string,
    vs_currency: string = 'usd',
    days: number = 365,
    readFromFile?: boolean,
  ) {
    try {
      const data: OHLCChartDataResponse = await this.getChartData(
        id,
        'ohlc',
        vs_currency,
        days,
        readFromFile,
      );
      return data;
    } catch (error) {
      this.logger.error('Error fetching or saving market data', error.stack);
      throw new Error('Failed to fetch market data: ' + error.message);
    }
  }

  async preparingHistoricalPriceDataAndFillByEntity(
    id: string,
    vs_currency: string = 'usd',
    days: number = 365,
    readFromFile?: boolean,
  ) {
    // Fetch data from both endpoints
    const ohlcData: OHLCChartDataResponse = await this.getChartData(
      id,
      'ohlc',
      vs_currency,
      days,
      readFromFile,
    );
    const historicalData: HisoricalDataResponse = await this.getChartData(
      id,
      'market_chart',
      vs_currency,
      days,
      readFromFile,
    );

    return HistoricalPriceMapper.toCoinHistoricalChartData(
      ohlcData,
      {
        total_volumes: historicalData.total_volumes,
        market_caps: historicalData.market_caps,
      },
      id,
    );
  }

  async createCandlestickData(
    id: string,
    vs_currency: string = 'usd',
    days: number = 365,
    readFromFile?: boolean,
  ) {
    try {
      // Fetch data from both endpoints
      const historicalPrices =
        await this.preparingHistoricalPriceDataAndFillByEntity(
          id,
          vs_currency,
          days,
          readFromFile,
        );

      this.logger.log(`Successfully filled historical price data for ${id}`);

      const filePath = `${this.directory}${id}-fillHistoricalPriceData-${vs_currency}-${days}.json`;
      await writeFile(filePath, historicalPrices);

      await this.prisma.coinHistoricalPrice.createMany({
        data: historicalPrices,
      });
      this.logger.log(`Successfully add ${id} historical data to database`);

      return historicalPrices;
    } catch (error) {
      this.logger.error('Error filling historical price data', error.stack);
      throw new Error('Failed to fill historical price data: ' + error.message);
    }
  }

  async getCandlestickData(
    id: string,
    vs_currency: string = 'usd',
    days: number = 365,
  ) {
    const filePath = `${this.directory}${id}-fillHistoricalPriceData-${vs_currency}-${days}.json`;
    return await readFile(filePath);
  }
}
