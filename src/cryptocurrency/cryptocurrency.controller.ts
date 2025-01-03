import { PriceCryptocurrencyRepository } from './repositories/price-cryptocurrency.repository';
import { HistoricalPriceCryptocurrencyRepository } from './repositories/historical-price-cryptocurrency.repository';
import { GeneralCryptocurrencyRepository } from './repositories/general-cryptocurrency.repository';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { GetChartDataDto } from './dto/get-chart-data.dto';

@ApiTags('Cryptocurrency')
@Controller({
  path: 'cryptocurrency',
  version: '1',
})
export class CryptocurrencyController {
  constructor(
    private readonly cryptocurrencyRepository: GeneralCryptocurrencyRepository,
    private readonly historicalPriceCryptocurrencyRepository: HistoricalPriceCryptocurrencyRepository,
    private readonly priceCryptocurrencyRepository: PriceCryptocurrencyRepository,
  ) {}

  @UseGuards(AuthGuard)
  @Post('create-cryptocurrencies')
  @HttpCode(HttpStatus.CREATED)
  create() {
    return this.cryptocurrencyRepository.fetchAndStoreCryptocurrencies();
  }

  @UseGuards(AuthGuard)
  @Get('get-all-coins')
  @HttpCode(HttpStatus.ACCEPTED)
  getAllCoins() {
    return this.cryptocurrencyRepository.getAllCoins();
  }

  @UseGuards(AuthGuard)
  @Post('get-historical-data')
  @HttpCode(HttpStatus.ACCEPTED)
  getHistoricalData(
    @Body()
    { id, vs_currency, days, readFromFile }: GetChartDataDto,
  ) {
    return this.historicalPriceCryptocurrencyRepository.getHistoricalData(
      id,
      vs_currency,
      days,
      readFromFile,
    );
  }

  @UseGuards(AuthGuard)
  @Post('get-ohlc-chart-data')
  @HttpCode(HttpStatus.ACCEPTED)
  getOHLC_ChartData(
    @Body()
    { id, vs_currency, days, readFromFile }: GetChartDataDto,
  ) {
    return this.historicalPriceCryptocurrencyRepository.getOHLCChartData(
      id,
      vs_currency,
      days,
      readFromFile,
    );
  }

  @UseGuards(AuthGuard)
  @Post('create-candlestack-data')
  @HttpCode(HttpStatus.ACCEPTED)
  createCandlestickData(
    @Body()
    { id, vs_currency, days, readFromFile }: GetChartDataDto,
  ) {
    return this.historicalPriceCryptocurrencyRepository.createCandlestickData(
      id,
      vs_currency,
      days,
      readFromFile,
    );
  }

  @UseGuards(AuthGuard)
  @Post('get-candlestick-data')
  @HttpCode(HttpStatus.ACCEPTED)
  getCandlestickData(
    @Body()
    { id, vs_currency, days }: Omit<GetChartDataDto, 'readFromFile'>,
  ) {
    return this.historicalPriceCryptocurrencyRepository.getCandlestickData(
      id,
      vs_currency,
      days,
    );
  }

  @UseGuards(AuthGuard)
  @Post('get-coin-price')
  @HttpCode(HttpStatus.ACCEPTED)
  getCoinPrice(@Body() body: { coinId: string }) {
    return this.priceCryptocurrencyRepository.fetchAndSaveMarketData(
      body.coinId,
    );
  }
}
