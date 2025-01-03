import { IndicatorValue, PriceData } from '../types';

export class RSICalculator {
  calculateRSI(data: PriceData[], period: number = 14): IndicatorValue[] {
    const closes = data.map((d) => d.close);
    const deltas = closes.slice(1).map((price, i) => price - closes[i]);
    const gains = deltas.map((delta) => (delta > 0 ? delta : 0));
    const losses = deltas.map((delta) => (delta < 0 ? Math.abs(delta) : 0));

    let avgGain = gains.slice(0, period).reduce((a, b) => a + b) / period;
    let avgLoss = losses.slice(0, period).reduce((a, b) => a + b) / period;

    const rsiValues: IndicatorValue[] = [];

    for (let i = period; i < closes.length; i++) {
      avgGain = (avgGain * (period - 1) + gains[i - 1]) / period;
      avgLoss = (avgLoss * (period - 1) + losses[i - 1]) / period;

      const rs = avgGain / avgLoss;
      const rsi = 100 - 100 / (1 + rs);

      rsiValues.push({
        timestamp: data[i].timestamp,
        value: rsi,
      });
    }

    return rsiValues;
  }
}
