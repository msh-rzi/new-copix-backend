import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CurrencyMapper } from '../mapper/currency.mapper';
import { axiosGateway } from '../utils/axiosGateway';

@Injectable()
export class PriceCryptocurrencyRepository {
  private readonly logger = new Logger(PriceCryptocurrencyRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async fetchAndSaveMarketData(coinId: string) {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true&precision=11`;

    try {
      const response = await axiosGateway({ url });
      const data = response.data;

      const marketData = CurrencyMapper.toMarketData({
        ...data[coinId],
        id: coinId,
      });

      await this.prisma.coinPrice.create({
        data: marketData,
      });

      this.logger.log('Market data saved successfully');
      return data;
    } catch (error) {
      this.logger.error('Error fetching or saving market data', error.stack);
      throw new Error('Failed to fetch market data: ' + error.message);
    }
  }
}
