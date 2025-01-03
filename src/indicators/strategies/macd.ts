import { MACDResult, PriceData, IndicatorValue } from '../types';

export class MACDCalculator {
  calculateMACD(
    data: PriceData[],
    fastPeriod: number = 12,
    slowPeriod: number = 26,
    signalPeriod: number = 9,
  ): MACDResult {
    const closes = data.map((d) => d.close);
    const timestamps = data.map((d) => d.timestamp);

    const fastEMA = this.calculateEMA(closes, timestamps, fastPeriod);
    const slowEMA = this.calculateEMA(closes, timestamps, slowPeriod);

    const macdLine = fastEMA.map((fast, i) => ({
      timestamp: fast.timestamp,
      value: fast.value - slowEMA[i].value,
    }));

    const signalLine = this.calculateEMA(
      macdLine.map((m) => m.value),
      macdLine.map((m) => m.timestamp),
      signalPeriod,
    );

    const histogram = macdLine.map((macd, i) => ({
      timestamp: macd.timestamp,
      value: macd.value - signalLine[i].value,
    }));

    return { macd: macdLine, signal: signalLine, histogram };
  }

  private calculateEMA(
    values: number[],
    timestamps: number[],
    period: number,
  ): IndicatorValue[] {
    const multiplier = 2 / (period + 1);
    const emaValues: IndicatorValue[] = [];

    let ema = values.slice(0, period).reduce((a, b) => a + b) / period;

    for (let i = period; i < values.length; i++) {
      ema = (values[i] - ema) * multiplier + ema;
      emaValues.push({
        timestamp: timestamps[i],
        value: ema,
      });
    }

    return emaValues;
  }
}
