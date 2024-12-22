import {
  CreateCryptoCurrencyEntity,
  CryptocurrencyEntity,
} from '../entities/cryptocurreny.entity';

export class CurrencyMapper {
  static toCreateDomain(
    raw: CryptocurrencyEntity[],
  ): CreateCryptoCurrencyEntity[] {
    const cryptocurrency: CreateCryptoCurrencyEntity[] = [];

    raw.forEach((data) => {
      const createCoin = new CreateCryptoCurrencyEntity();
      createCoin.id = data.id;
      createCoin.symbol = data.symbol;
      createCoin.name = data.name;
      createCoin.image = data.image;
      cryptocurrency.push(createCoin);
    });

    return cryptocurrency;
  }
}
