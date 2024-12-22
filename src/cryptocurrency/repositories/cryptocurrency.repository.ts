import { Injectable } from '@nestjs/common';

import * as fs from 'fs';
import { CryptocurrencyEntity } from '../entities/cryptocurreny.entity';
import { CurrencyMapper } from '../mapper/currency.mapper';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CryptocurrencyRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ** requests from Coingecko
  async fetchAndStoreCryptocurrencies(): Promise<void> {
    const fileContent = fs.readFileSync(
      './src/cryptocurrency/static/cryptocurrencies.json',
      'utf-8',
    );

    const jsonData = (await JSON.parse(fileContent)) as CryptocurrencyEntity[];

    const mappedData = CurrencyMapper.toCreateDomain(jsonData);

    await this.prisma.coins.createMany({
      data: mappedData,
    });
  }

  async getAllCoins() {
    try {
      const coins = await this.prisma.coins.findMany();
      return coins;
    } catch (error) {
      throw new Error('Failed to fetch coins: ' + error.message);
    }
  }
}
