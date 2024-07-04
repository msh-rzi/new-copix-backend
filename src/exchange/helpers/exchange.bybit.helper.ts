import { Injectable } from '@nestjs/common';
import { BybitService } from '../shared/bybit.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExchangeBybitHelper {
  constructor(
    private readonly bybitService: BybitService,
    private readonly prisma: PrismaService,
  ) {}

  async getPositionInfo(
    userId: string,
    category: BybitOrderCategory,
    symbol: string,
  ) {
    const client = this.bybitService.getClient(userId);
    const getPositionInfo = await client.getPositionInfo({
      category,
      symbol,
    });

    return getPositionInfo;
  }

  async getUserAlgorithms(usersId: string, exchangeId: string) {
    return await this.prisma.algorithm.findMany({
      where: { usersId, exchangeId },
      orderBy: { id: 'desc' },
    });
  }

  async switchPositionMode(
    userId: string,
    category: 'inverse' | 'linear',
    symbol: string,
  ) {
    const client = this.bybitService.getClient(userId);
    const switchHedgeMode = await client.switchPositionMode({
      category,
      symbol,
      mode: 3,
    });
    console.log({ switchHedgeMode });
  }

  async updateLeverage(
    userId: string,
    category: 'inverse' | 'linear',
    symbol: string,
    leverage: string,
  ) {
    const client = this.bybitService.getClient(userId);
    const setLeverage = await client.setLeverage({
      category,
      symbol,
      buyLeverage: leverage,
      sellLeverage: leverage,
    });
    console.log({ setLeverage });
  }

  async getCoinLastPrice(
    userId: string,
    category: 'inverse' | 'linear',
    symbol: string,
  ) {
    const client = this.bybitService.getClient(userId);
    const tickers = await client.getTickers({ category, symbol });
    console.log({ tickers });
    return tickers.result.list.at(0).lastPrice;
  }

  async updatePositionConfig(userId: string, symbol: string, leverage: string) {
    const category = 'linear';
    console.log(
      `Starting updatePositionConfig with userId: ${userId}, symbol: ${symbol}, leverage: ${leverage}`,
    );

    try {
      const targetCoinPositionInfo = await this.getPositionInfo(
        userId,
        category,
        symbol,
      );
      console.log(
        `targetCoinPositionInfo: ${JSON.stringify(targetCoinPositionInfo)}`,
      );

      if (targetCoinPositionInfo.retCode !== 0) {
        console.error('Error in getPositionInfo:', targetCoinPositionInfo);
        return {
          message: 'error getPositionInfo',
        };
      }

      // update leverage
      const currentLeverage = targetCoinPositionInfo.result.list.at(0).leverage;
      console.log(
        `Current leverage: ${currentLeverage}, Desired leverage: ${leverage.toString()}`,
      );

      if (currentLeverage !== leverage.toString()) {
        const setLeverage = await this.updateLeverage(
          userId,
          category,
          symbol,
          leverage.toString(),
        );
        console.log(`Leverage update response: ${JSON.stringify(setLeverage)}`);
      }

      // update position mode
      const switchHedgeMode = await this.switchPositionMode(
        userId,
        category,
        symbol,
      );
      console.log(
        `Position mode switch response: ${JSON.stringify(switchHedgeMode)}`,
      );
    } catch (error) {
      console.error('Error in updatePositionConfig:', error);
      return {
        message: 'exception occurred',
      };
    }
  }
}
