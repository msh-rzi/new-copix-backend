export interface PriceData {
   timestamp: number;
   open: number;
   high: number;
   low: number;
   close: number;
   volume: number;
}

export interface IndicatorConfig {
   period?: number;
   fastPeriod?: number;
   slowPeriod?: number;
   signalPeriod?: number;
}

export interface IndicatorValue {
   timestamp: number;
   value: number;
}

export interface MACDResult {
   macd: IndicatorValue[];
   signal: IndicatorValue[];
   histogram: IndicatorValue[];
}
