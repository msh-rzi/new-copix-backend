import { Controller, Get, Query } from '@nestjs/common';
import { IndicatorsService } from './indicators.service';
import { IndicatorConfig, PriceData } from './types';

@Controller('api/indicators')
export class IndicatorsController {
  constructor(private readonly indicatorsService: IndicatorsService) {}

  @Get('rsi')
  calculateRSI(@Query('data') data: string, @Query('period') period: string) {
    const priceData: PriceData[] = JSON.parse(data);
    const config: IndicatorConfig = { period: parseInt(period) || 14 };
    return this.indicatorsService.calculateRSI(priceData, config);
  }

  @Get('macd')
  calculateMACD(
    @Query('data') data: string,
    @Query('fastPeriod') fastPeriod: string,
    @Query('slowPeriod') slowPeriod: string,
    @Query('signalPeriod') signalPeriod: string,
  ) {
    const priceData: PriceData[] = JSON.parse(data);
    const config: IndicatorConfig = {
      fastPeriod: parseInt(fastPeriod) || 12,
      slowPeriod: parseInt(slowPeriod) || 26,
      signalPeriod: parseInt(signalPeriod) || 9,
    };
    return this.indicatorsService.calculateMACD(priceData, config);
  }

  @Get('sma')
  calculateSMA(@Query('data') data: string, @Query('period') period: string) {
    const priceData: PriceData[] = JSON.parse(data);
    return this.indicatorsService.calculateSMA(
      priceData,
      parseInt(period) || 20,
    );
  }
}
