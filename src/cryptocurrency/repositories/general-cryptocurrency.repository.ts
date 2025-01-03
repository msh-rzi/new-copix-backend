import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { CurrencyMapper } from '../mapper/currency.mapper';
import { PrismaService } from 'src/prisma/prisma.service';
import { CoinEntity } from '../entities/cryptocurreny.entity';

@Injectable()
export class GeneralCryptocurrencyRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ** requests from Coingecko
  async fetchAndStoreCryptocurrencies(): Promise<void> {
    const fileContent = fs.readFileSync(
      './src/cryptocurrency/static/cryptocurrencies.json',
      'utf-8',
    );

    const jsonData = (await JSON.parse(fileContent)) as CoinEntity[];

    const mappedData = CurrencyMapper.toCreateDomain(jsonData);

    await this.prisma.coin.createMany({
      data: mappedData,
    });
  }

  async getAllCoins() {
    try {
      const coins = await this.prisma.coin.findMany();
      return coins;
    } catch (error) {
      throw new Error('Failed to fetch coins: ' + error.message);
    }
  }
}
