import { Injectable } from '@nestjs/common';
import { RSICalculator } from './strategies/rsi';
import { MACDCalculator } from './strategies/macd';
import {
  PriceData,
  IndicatorConfig,
  IndicatorValue,
  MACDResult,
} from './types';

@Injectable()
export class IndicatorsService {
  private rsiCalculator = new RSICalculator();
  private macdCalculator = new MACDCalculator();

  calculateRSI(
    data: PriceData[],
    config: IndicatorConfig = { period: 14 },
  ): IndicatorValue[] {
    return this.rsiCalculator.calculateRSI(data, config.period);
  }

  calculateMACD(
    data: PriceData[],
    config: IndicatorConfig = {
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9,
    },
  ): MACDResult {
    return this.macdCalculator.calculateMACD(
      data,
      config.fastPeriod,
      config.slowPeriod,
      config.signalPeriod,
    );
  }

  calculateSMA(data: PriceData[], period: number): IndicatorValue[] {
    const values: IndicatorValue[] = [];
    for (let i = period - 1; i < data.length; i++) {
      const sum = data
        .slice(i - period + 1, i + 1)
        .reduce((acc, val) => acc + val.close, 0);
      values.push({
        timestamp: data[i].timestamp,
        value: sum / period,
      });
    }
    return values;
  }
}
